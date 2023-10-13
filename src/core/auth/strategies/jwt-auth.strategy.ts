import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { IJwtPayload } from 'src/core/auth/interfaces/jwt-payload.interface';
import { IUserContext } from 'src/core/auth/interfaces/user-context.interface';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(
  Strategy,
  'jwtAuthStrategy',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // Passport will decodes the JWT using the secret key, then invokes the validate method below with the decoded JSON as a parameter
  // Passport builds a user object on the return value and attaches it to the request object
  async validate(payload: IJwtPayload): Promise<IUserContext> {
    const { roles, sub: id, endCustomerId } = payload;
    return {
      id,
      roles,
      endCustomerId,
    };
  }
}
