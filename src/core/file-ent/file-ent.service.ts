import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';

import { FileEnt } from './entities/file-ent.entity';
import { CreateFileEntDto } from './dto/create-file-ent.dto';

@Injectable()
export class FileEntService {
  constructor(
    @InjectRepository(FileEnt)
    private readonly fileRepository: CustomEntityRepository<FileEnt>,
    private readonly em: EntityManager,
  ) {}

  async createPersisted(createFileEntDto: CreateFileEntDto) {
    const fileEnt = this.fileRepository.create(createFileEntDto);
    await this.em.persistAndFlush(fileEnt);
    return fileEnt;
  }
  // findAll() {
  //   return `This action returns all file`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} file`;
  // }
  // update(id: number, updateFileDto: UpdateFileDto) {
  //   return `This action updates a #${id} file`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} file`;
  // }
}
