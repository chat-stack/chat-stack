import { Role } from 'src/common/types/role.type';

export interface IUserContext {
  id?: number;
  roles: Role[];
  endCustomerId?: number;
}
