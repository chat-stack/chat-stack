import { ApiProperty } from '@nestjs/swagger';

import {
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  Property,
  Rel,
  Unique,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { EndCustomer } from 'src/core/end-customer/entities/end-customer.entity';
import { ChatBot } from 'src/core/chat-bot/entities/chat-bot.entity';
import { ChatHistory } from 'src/core/chat-history/entities/chat-history.entity';

@Entity()
export class ChatSession extends CustomBaseEntity<
  ChatSession,
  'chatHistories'
> {
  @ApiProperty({
    example: 'f56c10b8-55a2-4e39-af78-f4419a0c0fd2',
    description:
      'This is a frontend distinct id that maintains a pointer of a unique anonymous chat session',
  })
  @Unique()
  @Index()
  @Property()
  distinctId: string;

  @ManyToOne(() => ChatBot, {
    name: 'chat_bot_id',
  })
  chatBot: Rel<ChatBot>;

  @ManyToOne(() => EndCustomer, {
    name: 'end_customer_id',
    nullable: true,
  })
  endCustomer?: Rel<EndCustomer>;

  @ApiProperty()
  @Index({
    name: 'chat_session_metadata_index',
    expression: `CREATE INDEX chat_session_metadata_index ON chat_session USING gin (metadata)`,
  })
  @Property({ type: 'jsonb' })
  metadata?: Record<string, any>;

  @OneToMany(() => ChatHistory, (chatHistory) => chatHistory.chatSession, {
    nullable: false,
  })
  @Exclude()
  chatHistories = new Collection<Rel<ChatHistory>>(this);
}
