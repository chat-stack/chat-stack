import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

@Entity({ abstract: true })
export abstract class CustomBaseEntity<E, K extends keyof E | undefined> {
  [OptionalProps]?: 'createdAt' | 'updatedAt' | K;

  @PrimaryKey()
  @Exclude()
  id: number;

  @Property()
  @Exclude()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @Exclude()
  updatedAt: Date = new Date();
}
