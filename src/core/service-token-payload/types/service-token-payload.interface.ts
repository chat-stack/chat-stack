import { Role } from 'src/core/role/types/role.type';

export interface IServiceTokenPayload {
  roles: Role[];
  iat?: number;
}

export interface IServiceTokenPayloadVerified {
  roles: Role[];
  iat: string;
  exp: string;
}
