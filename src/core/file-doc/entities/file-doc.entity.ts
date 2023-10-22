import { ApiProperty } from '@nestjs/swagger';

import { Entity, Index, ManyToOne, Property, Rel } from '@mikro-orm/core';
import { Expose } from 'class-transformer';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { Rag } from 'src/core/rag/entities/rag.entity';
import { FileEnt } from 'src/core/file-ent/entities/file-ent.entity';

@Entity()
export class FileDoc extends CustomBaseEntity<
  FileDoc,
  'metadata' | 'loadedAt'
> {
  @ApiProperty({ type: () => Rag })
  @ManyToOne(() => Rag)
  @Expose()
  rag: Rel<Rag>;

  @ManyToOne(() => FileEnt, {
    nullable: false,
  })
  fileEnt: Rel<FileEnt>;

  @ApiProperty()
  @Index({
    name: 'file_doc_metadata_index',
    expression: `CREATE INDEX file_doc_metadata_index ON file_doc USING gin (metadata)`,
  })
  @Property({ type: 'jsonb', nullable: true })
  @Expose()
  metadata?: Record<string, any>;

  @ApiProperty()
  @Property({
    nullable: true,
  })
  @Expose()
  loadedAt?: Date;
}
