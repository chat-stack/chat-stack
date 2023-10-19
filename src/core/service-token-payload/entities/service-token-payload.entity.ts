import { Entity, Enum, Property, Unique } from '@mikro-orm/core';

import { Role } from 'src/common/types/role.type';
import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';

@Entity()
export class ServiceTokenPayload extends CustomBaseEntity<
  ServiceTokenPayload,
  'role'
> {
  @Unique()
  @Enum({ items: () => Role, array: false, default: Role.ANON, type: 'string' })
  role: Role = Role.ANON;

  @Property({ type: 'int8' })
  iat: number;

  @Property({ type: 'int8' })
  exp: number;
}
