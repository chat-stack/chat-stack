import { ApiProperty } from '@nestjs/swagger';

import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { ChatSession } from 'src/core/chat-session/entities/chat-session.entity';

@Entity()
export class ChatBot extends CustomBaseEntity<
  ChatBot,
  'firstAssistantMessage' | 'chatSessions'
> {
  @ApiProperty()
  @Unique()
  @Property()
  name: string;

  @ApiProperty()
  @Property()
  promptTemplate?: string;

  @ApiProperty()
  @Property()
  firstAssistantMessage?: string;

  @OneToMany(() => ChatSession, (chatSession) => chatSession.chatBot, {
    nullable: false,
  })
  @Exclude()
  chatSessions = new Collection<ChatSession>(this);
}
