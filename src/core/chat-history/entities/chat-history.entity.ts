import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Rel } from '@mikro-orm/core';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { ChatRole } from 'src/common/types/chat-role.type';
import { ChatSession } from 'src/core/chat-session/entities/chat-session.entity';

@Entity()
export class ChatHistory extends CustomBaseEntity<ChatHistory, undefined> {
  @ManyToOne(() => ChatSession, {
    name: 'chat_session_id',
    nullable: false,
  })
  chatSession: Rel<ChatSession>;

  @Enum({ items: () => ChatRole, array: false, type: 'string' })
  chatRole: ChatRole;

  @Property({ type: 'text' })
  message: string;
}
