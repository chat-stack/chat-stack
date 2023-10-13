import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IServiceTokenPayload } from 'src/core/service-token-payload/interfaces/service-token-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  signServiceToken(serviceTokenPayload: IServiceTokenPayload): string {
    const serviceTokenPayloadToSign = {
      iss: 'metadata-gpt',
      ...serviceTokenPayload,
    };
    if (serviceTokenPayloadToSign.iat) {
      return this.jwtService.sign(serviceTokenPayloadToSign, {
        expiresIn: '10y',
      });
    }
    return this.jwtService.sign(serviceTokenPayloadToSign, { expiresIn: '7d' });
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
