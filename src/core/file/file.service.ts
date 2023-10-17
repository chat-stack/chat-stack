import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';

import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: CustomEntityRepository<File>,
    private readonly em: EntityManager,
  ) {}

  async create(createFileDto: CreateFileDto) {
    const file = this.fileRepository.create(createFileDto);
    await this.em.persistAndFlush(file);
    return file;
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
