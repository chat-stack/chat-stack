import { ApiProperty } from '@nestjs/swagger';

import {
  Cascade,
  Entity,
  Index,
  ManyToOne,
  Property,
  Rel,
} from '@mikro-orm/core';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { Rag } from 'src/core/rag/entities/rag.entity';

@Entity()
export class TextDoc extends CustomBaseEntity<
  TextDoc,
  'metadata' | 'loadedAt'
> {
  @ApiProperty({ type: () => Rag })
  @ManyToOne(() => Rag, {
    cascade: [Cascade.REMOVE],
    onDelete: 'cascade',
  })
  rag: Rel<Rag>;

  @ApiProperty()
  @Property({ type: 'text' })
  text: string;

  @ApiProperty()
  @Index({
    name: 'text_doc_metadata_index',
    expression: `CREATE INDEX text_doc_metadata_index ON text_doc USING gin (metadata)`,
  })
  @Property({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @ApiProperty()
  @Property({ nullable: true })
  loadedAt?: Date;
}
