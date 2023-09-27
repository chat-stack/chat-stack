import { ApiProperty } from '@nestjs/swagger';

import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

@Entity({ abstract: true })
export abstract class CustomBaseEntity<E, K extends keyof E | undefined> {
  [OptionalProps]?: 'createdAt' | 'updatedAt' | K;

  @PrimaryKey()
  @ApiProperty()
  @Exclude()
  id: number;

  @Property()
  @ApiProperty()
  @Exclude()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @ApiProperty()
  @Exclude()
  updatedAt: Date = new Date();
}
