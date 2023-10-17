import { ApiProperty } from '@nestjs/swagger';

import {
  Cascade,
  Entity,
  Index,
  ManyToOne,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { Rag } from 'src/core/rag/entities/rag.entity';
import { File } from 'src/core/file/entities/file.entity';

@Entity()
export class FileDoc extends CustomBaseEntity<
  FileDoc,
  'metadata' | 'loadedAt'
> {
  @ApiProperty()
  @ManyToOne(() => Rag)
  @Expose()
  rag: Rag;

  @OneToOne(() => File, {
    nullable: false,
    cascade: [Cascade.ALL],
    orphanRemoval: true,
  })
  file: File;

  @ApiProperty()
  @Property()
  @Expose()
  directoryPath: string;

  @ApiProperty()
  @Property()
  @Expose()
  filename: string;

  @ApiProperty()
  @Property()
  @Expose()
  mimeType: string;

  @ApiProperty()
  @Index({
    name: 'file_doc_metadata_index',
    expression: `CREATE INDEX file_doc_metadata_index ON file_doc USING gin (metadata)`,
  })
  @Property({ type: 'jsonb' })
  @Expose()
  metadata?: Record<string, any>;

  @ApiProperty()
  @Property()
  @Expose()
  loadedAt?: Date;
}
