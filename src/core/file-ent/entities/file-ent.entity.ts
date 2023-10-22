import { ApiProperty } from '@nestjs/swagger';

import { Collection, Entity, OneToMany, Property, Rel } from '@mikro-orm/core';
import { Expose } from 'class-transformer';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { FileDoc } from 'src/core/file-doc/entities/file-doc.entity';

@Entity()
export class FileEnt extends CustomBaseEntity<
  FileEnt,
  'fileDocs' | 'directoryPath'
> {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({ type: () => FileDoc })
  @OneToMany(() => FileDoc, (fileDoc) => fileDoc.fileEnt, {
    nullable: true,
  })
  fileDocs? = new Collection<Rel<FileDoc>>(this);

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
