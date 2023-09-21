import { Entity, Enum, Property, Unique } from '@mikro-orm/core';

import { Role } from 'src/core/role/types/role.type';
import CustomBaseEntity from 'src/util/custom-base-entity.entity';

@Entity()
export class ServiceTokenPayload extends CustomBaseEntity {
  @Unique()
  @Enum({ items: () => Role, array: false, default: Role.ANON })
  role: Role = Role.ANON;

  @Property({ type: 'int8' })
  iat: number;

  @Property({ type: 'int8' })
  exp: number;
}
