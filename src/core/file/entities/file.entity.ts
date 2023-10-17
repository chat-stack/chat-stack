import { ApiProperty } from '@nestjs/swagger';

import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Expose } from 'class-transformer';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { FileDoc } from 'src/core/file-doc/entities/file-doc.entity';

@Entity()
export class File extends CustomBaseEntity<File, 'fileDoc' | 'directoryPath'> {
  @ApiProperty()
  @OneToOne(() => FileDoc, {
    mappedBy: 'file',
    nullable: true,
  })
  @Expose()
  fileDoc?: FileDoc;

  @ApiProperty()
  @Property()
  @Expose()
  directoryPath = 'default';

  @ApiProperty()
  @Property()
  @Expose()
  filename: string;

  @ApiProperty()
  @Property()
  @Expose()
  mimeType: string;
}
