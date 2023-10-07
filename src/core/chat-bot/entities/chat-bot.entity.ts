import { ApiProperty } from '@nestjs/swagger';

import {
  Cascade,
  Collection,
  Entity,
  Enum,
  Index,
  OneToMany,
  OneToOne,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { v4 as uuid } from 'uuid';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { ChatSession } from 'src/core/chat-session/entities/chat-session.entity';
import { ChatBotMode } from 'src/core/chat-bot/types/chatBotType.type';
import { Rag } from 'src/core/rag/entities/rag.entity';

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
    cascade: [Cascade.ALL],
    orphanRemoval: true,
    nullable: false,
  })
  @Exclude()
  chatSessions = new Collection<ChatSession>(this);

  @ApiProperty()
  @Enum({
    items: () => ChatBotMode,
    array: false,
    default: ChatBotMode.DEFAULT,
  })
  @Expose()
  mode: ChatBotMode = ChatBotMode.DEFAULT;

  @OneToOne(() => Rag, {
    nullable: true,
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  rag?: Rag;
}
