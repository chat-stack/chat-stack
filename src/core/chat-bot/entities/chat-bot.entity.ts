import { ApiProperty } from '@nestjs/swagger';

import { Entity, Property, Unique } from '@mikro-orm/core';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';

@Entity()
export class ChatBot extends CustomBaseEntity {
  @Unique()
  @Property()
  @ApiProperty()
  name: string;
}
