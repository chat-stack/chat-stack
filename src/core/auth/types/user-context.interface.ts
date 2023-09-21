import { Role } from 'src/core/role/types/role.type';

export interface IUserContext {
  id?: number;
  roles: Role[];
}
