import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Observable } from 'rxjs';

import { Role } from 'src/core/role/types/role.type';
import { ROLES_KEY } from 'src/core/auth/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      // If there are no roles defined for this route, allow access.
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming you have user information attached to the request.

    if (!user) {
      // If there is no user information, deny access.
      return false;
    }

    // Check if the user has any of the required roles
    const hasRequiredRole = roles.some((role) => user.roles.includes(role));

    return hasRequiredRole;
  }
}
