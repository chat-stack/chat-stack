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
  Rel,
  Unique,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
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
  uuid: string = uuid();

  @ApiProperty()
  @Unique()
  @Property()
  name: string;

  @ApiProperty()
  @Property({ nullable: true })
  promptTemplate?: string;

  @ApiProperty()
  @Property({ nullable: true })
  firstAssistantMessage?: string;

  @OneToMany(() => ChatSession, (chatSession) => chatSession.chatBot, {
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  @Exclude()
  chatSessions = new Collection<Rel<ChatSession>>(this);

  @ApiProperty({ enum: ChatBotMode })
  @Enum({
    items: () => ChatBotMode,
    array: false,
    default: ChatBotMode.DEFAULT,
    type: 'string',
  })
  mode: ChatBotMode = ChatBotMode.DEFAULT;

  @OneToOne(() => Rag, {
    cascade: [Cascade.ALL],
    orphanRemoval: true,
    nullable: true,
  })
  rag?: Rel<Rag>;
}
