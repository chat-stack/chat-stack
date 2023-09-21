import { Role } from 'src/core/role/types/role.type';

export interface IJwtPayload {
  iss: string;
  sub?: number;
  roles: Role[];
}
