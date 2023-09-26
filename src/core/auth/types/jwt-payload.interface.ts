import { Role } from 'src/common/types/role.type';

export interface IJwtPayload {
  iss: string;
  sub?: number;
  roles: Role[];
  endCustomerId?: number;
}
