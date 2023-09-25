import { Collection, Entity, OneToMany } from '@mikro-orm/core';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { ChatSession } from 'src/core/chat-session/entities/chat-session.entity';

@Entity()
export class EndCustomer extends CustomBaseEntity<EndCustomer, 'chatSessions'> {
  @OneToMany(() => ChatSession, (chatSession) => chatSession.endCustomer, {
    nullable: false,
  })
  chatSessions = new Collection<ChatSession>(this);
}
