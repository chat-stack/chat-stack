import { ApiProperty } from '@nestjs/swagger';

import {
  Entity,
  Index,
  OneToOne,
  Property,
  Rel,
  Unique,
} from '@mikro-orm/core';
import { Expose } from 'class-transformer';
import { v4 as uuid } from 'uuid';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { FileDoc } from 'src/core/file-doc/entities/file-doc.entity';

@Entity()
export class File extends CustomBaseEntity<File, 'fileDoc' | 'directoryPath'> {
  @ApiProperty()
  @Index()
  @Unique()
  @Property({ type: 'uuid', default: uuid() })
  @Expose()
  uuid: string = uuid();

  @ApiProperty()
  @OneToOne(() => FileDoc, {
    mappedBy: 'file',
    nullable: true,
  })
  @Expose()
  fileDoc?: Rel<FileDoc>;

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
