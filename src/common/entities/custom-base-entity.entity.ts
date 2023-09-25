import { ApiProperty } from '@nestjs/swagger';

import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class CustomBaseEntity<E, K extends keyof E | undefined> {
  [OptionalProps]?: 'createdAt' | 'updatedAt' | K;

  @PrimaryKey()
  @ApiProperty()
  id: number;

  @Property()
  @ApiProperty()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @ApiProperty()
  updatedAt: Date = new Date();
}
