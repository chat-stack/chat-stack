import { ApiProperty } from '@nestjs/swagger';

import {
  Collection,
  Entity,
  Index,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { v4 as uuid } from 'uuid';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { ChatSession } from 'src/core/chat-session/entities/chat-session.entity';

@Entity()
export class ChatBot extends CustomBaseEntity<
  ChatBot,
  'firstAssistantMessage' | 'chatSessions'
> {
  @ApiProperty()
  @Index()
  @Unique()
  @Property({ type: 'uuid', default: uuid() })
  @Expose()
  uuid: string = uuid();

  @ApiProperty()
  @Unique()
  @Property()
  @Expose()
  name: string;

  @ApiProperty()
  @Property()
  @Expose()
  promptTemplate?: string;

  @ApiProperty()
  @Property()
  @Expose()
  firstAssistantMessage?: string;

  @OneToMany(() => ChatSession, (chatSession) => chatSession.chatBot, {
    nullable: false,
  })
  @Exclude()
  chatSessions = new Collection<ChatSession>(this);
}
