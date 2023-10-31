import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
export class WebDoc extends CustomBaseEntity<WebDoc, 'metadata' | 'loadedAt'> {
  @ApiProperty({ type: () => Rag })
  @ManyToOne(() => Rag, {
    cascade: [Cascade.REMOVE],
    onDelete: 'cascade',
  })
  rag: Rel<Rag>;

  @ApiProperty()
  @Property({ type: 'text' })
  url: string;

  @ApiPropertyOptional()
  @Index({
    name: 'web_doc_metadata_index',
    expression: `CREATE INDEX web_doc_metadata_index ON web_doc USING gin (metadata)`,
  })
  @Property({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @ApiPropertyOptional()
  @Property({ nullable: true })
  loadedAt?: Date;
}
