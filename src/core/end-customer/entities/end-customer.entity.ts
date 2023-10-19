import { Collection, Entity, OneToMany, Rel } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { ChatSession } from 'src/core/chat-session/entities/chat-session.entity';

@Entity()
export class EndCustomer extends CustomBaseEntity<EndCustomer, 'chatSessions'> {
  @OneToMany(() => ChatSession, (chatSession) => chatSession.endCustomer, {
    nullable: false,
  })
  @Exclude()
  chatSessions = new Collection<Rel<ChatSession>>(this);
}
