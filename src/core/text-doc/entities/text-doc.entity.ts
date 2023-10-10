import { ApiProperty } from '@nestjs/swagger';

import { Entity, Index, ManyToOne, Property } from '@mikro-orm/core';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { Rag } from 'src/core/rag/entities/rag.entity';

@Entity()
export class TextDoc extends CustomBaseEntity<
  TextDoc,
  'metadata' | 'loadedAt'
> {
  @ApiProperty()
  @ManyToOne(() => Rag)
  rag: Rag;

  @ApiProperty()
  @Property({ type: 'text' })
  text: string;

  @ApiProperty()
  @Index({
    name: 'text_doc_metadata_index',
    expression: `CREATE INDEX text_doc_metadata_index ON text_doc USING gin (metadata)`,
  })
  @Property({ type: 'jsonb' })
  metadata?: Record<string, any>;

  @ApiProperty()
  @Property()
  loadedAt?: Date;
}
