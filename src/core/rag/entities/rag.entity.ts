import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Rel,
} from '@mikro-orm/core';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { ChatBot } from 'src/core/chat-bot/entities/chat-bot.entity';
import { TextDoc } from 'src/core/text-doc/entities/text-doc.entity';
import { WebDoc } from 'src/core/web-doc/entities/web-doc.entity';

@Entity()
export class Rag extends CustomBaseEntity<Rag, undefined> {
  @OneToOne(() => ChatBot, {
    mappedBy: 'rag',
  })
  chatBot: Rel<ChatBot>;

  @OneToMany(() => TextDoc, (textDoc) => textDoc.rag, {
    nullable: true,
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  textDocs = new Collection<Rel<TextDoc>>(this);

  @OneToMany(() => WebDoc, (webDoc) => webDoc.rag, {
    nullable: true,
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  webDocs = new Collection<Rel<WebDoc>>(this);
}
