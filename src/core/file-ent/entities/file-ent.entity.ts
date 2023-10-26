import { ApiProperty } from '@nestjs/swagger';

import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Rel,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

import { CustomBaseEntity } from 'src/common/entities/custom-base-entity.entity';
import { FileDoc } from 'src/core/file-doc/entities/file-doc.entity';

@Entity()
export class FileEnt extends CustomBaseEntity<
  FileEnt,
  'fileDocs' | 'directoryPath'
> {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: () => FileDoc })
  @OneToMany(() => FileDoc, (fileDoc) => fileDoc.fileEnt, {
    nullable: true,
    cascade: [Cascade.ALL],
  })
  @Exclude()
  fileDocs? = new Collection<Rel<FileDoc>>(this);

  @ApiProperty()
  @Property({
    default: './',
  })
  directoryPath: string = './';

  @ApiProperty()
  @Property()
  filename: string;

  @ApiProperty()
  @Property()
  mimeType: string;
}
