import { Role } from 'src/core/role/types/role.type';

export interface IServiceTokenPayload {
  role: Role;
  iat?: number;
}

export interface IServiceTokenPayloadVerified {
  role: Role;
  iat: string;
  exp: string;
}
