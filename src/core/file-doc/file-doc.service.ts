import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { Queue } from 'bull';
import { EntityManager, Reference, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';
import { FileEnt } from 'src/core/file-ent/entities/file-ent.entity';
import { Rag } from 'src/core/rag/entities/rag.entity';
import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';
import { LangChainService } from 'src/core/lang-chain/lang-chain.service';

import { CreateFileDocDto } from './dto/create-file-doc.dto';
import { IFileDocJobData } from './interfaces/file-doc-job-data.interface';
import { FileDoc } from './entities/file-doc.entity';
import { UpdateFileDocDto } from './dto/update-file-doc.dto';

@Injectable()
export class FileDocService {
  constructor(
    @InjectQueue('fileDoc')
    private readonly fileDocQueue: Queue,
    private readonly em: EntityManager,
    @InjectRepository(FileDoc)
    private readonly fileDocRepository: CustomEntityRepository<FileDoc>,
    private readonly langChainService: LangChainService,
  ) {}

  async createPersisted(createFileDocDto: CreateFileDocDto) {
    if (!createFileDocDto.ragId) {
      throw new BadRequestException('RagId is required');
    }
    const fileDoc = this.fileDocRepository.create({
      ...createFileDocDto,
      fileEnt: Reference.createFromPK(FileEnt, createFileDocDto.fileId),
      rag: Reference.createFromPK(Rag, createFileDocDto.ragId),
    });
    await this.em.persistAndFlush(fileDoc);
    await this.loadToVectorStoreBulk([fileDoc]);
    return fileDoc;
  }

  async findPage(pageOptionsDto: PageOptionsDto): Promise<PageDto<FileDoc>> {
    return this.fileDocRepository.findPage(pageOptionsDto);
  }

  async findOneOrFail(id: number): Promise<FileDoc> {
    return this.fileDocRepository.findOneOrFail(id, {
      failHandler: () => {
        throw new NotFoundException();
      },
      populate: ['fileEnt'],
    });
  }

  async update(id: number, updateFileDocDto: UpdateFileDocDto) {
    const fileDoc = await this.findOneOrFail(id);
    wrap(fileDoc).assign(updateFileDocDto);
    if (updateFileDocDto.fileId) {
      wrap(fileDoc).assign({
        fileEnt: Reference.createFromPK(FileEnt, updateFileDocDto.fileId),
      });
    }
    await this.em.persistAndFlush(fileDoc);
    await this.loadToVectorStoreBulk([fileDoc]);
    return fileDoc;
  }

  async remove(id: number) {
    const fileDoc = await this.findOneOrFail(id);
    await this.removeFromVectorStore(fileDoc);
    await this.em.removeAndFlush(fileDoc);
    return fileDoc;
  }

  async removeFromVectorStore(fileDoc: FileDoc) {
    await this.em.populate(fileDoc, ['rag.chatBot.uuid']);
    const indexName = `${fileDoc.rag.chatBot.uuid}-rag`;
    await this.langChainService.deleteDocuments(fileDoc.id, indexName);
  }

  async loadToVectorStoreBulk(fileDocs: FileDoc[]) {
    await this.em.populate(fileDocs, ['rag.chatBot.uuid']);
    return this.fileDocQueue.addBulk(
      fileDocs.map((fileDoc) => {
        const indexName = `${fileDoc.rag.chatBot.uuid}-rag`;
        const jobData: IFileDocJobData = {
          id: fileDoc.id,
          metadata: fileDoc.metadata,
          indexName,
        };
        return {
          name: 'fileDoc.loadToVectorStore',
          data: jobData,
        };
      }),
    );
  }
}
