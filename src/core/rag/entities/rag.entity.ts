import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Rel,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { ChatBot } from 'src/core/chat-bot/entities/chat-bot.entity';
import { FileDoc } from 'src/core/file-doc/entities/file-doc.entity';
import { TextDoc } from 'src/core/text-doc/entities/text-doc.entity';
import { WebDoc } from 'src/core/web-doc/entities/web-doc.entity';

@Entity()
export class Rag extends CustomBaseEntity<Rag, undefined> {
  @OneToOne(() => ChatBot, {
    mappedBy: 'rag',
  })
  chatBot: Rel<ChatBot>;

  @OneToMany(() => TextDoc, (textDoc) => textDoc.rag, {
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  @Exclude()
  textDocs = new Collection<Rel<TextDoc>>(this);

  @OneToMany(() => WebDoc, (webDoc) => webDoc.rag, {
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  @Exclude()
  webDocs = new Collection<Rel<WebDoc>>(this);

  @OneToMany(() => FileDoc, (fileDoc) => fileDoc.rag, {
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  @Exclude()
  fileDocs = new Collection<Rel<FileDoc>>(this);
}
