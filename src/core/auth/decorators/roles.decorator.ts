import { SetMetadata } from '@nestjs/common';

import { Role } from 'src/core/role/types/role.type';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
