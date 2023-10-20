import { ApiProperty } from '@nestjs/swagger';

import { Entity, OneToOne, Property, Rel } from '@mikro-orm/core';
import { Expose } from 'class-transformer';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { FileDoc } from 'src/core/file-doc/entities/file-doc.entity';

@Entity()
export class FileEnt extends CustomBaseEntity<
  FileEnt,
  'fileDoc' | 'directoryPath'
> {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({ type: () => FileDoc })
  @OneToOne(() => FileDoc, {
    mappedBy: 'fileEnt',
    nullable: true,
  })
  @Expose()
  fileDoc?: Rel<FileDoc>;

  @ApiProperty()
  @Property({
    default: './',
  })
  @Expose()
  directoryPath: string = './';

  @ApiProperty()
  @Property()
  @Expose()
  filename: string;

  @ApiProperty()
  @Property()
  @Expose()
  mimeType: string;
}
