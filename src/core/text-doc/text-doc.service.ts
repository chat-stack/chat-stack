import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { Document } from 'langchain/document';
import { Queue } from 'bull';
import { EntityManager, Reference, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';
import { Rag } from 'src/core/rag/entities/rag.entity';
import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';
import { LangChainService } from 'src/core/lang-chain/lang-chain.service';

import { CreateTextDocDto } from './dto/create-text-doc.dto';
import { ITextDocJobData } from './interfaces/text-doc-job-data.interface';
import { TextDoc } from './entities/text-doc.entity';
import { UpdateTextDocDto } from './dto/update-text-doc.dto';

@Injectable()
export class TextDocService {
  constructor(
    @InjectQueue('textDoc')
    private readonly textDocQueue: Queue,
    private readonly em: EntityManager,
    @InjectRepository(TextDoc)
    private readonly textDocRepository: CustomEntityRepository<TextDoc>,
    private readonly langChainService: LangChainService,
  ) {}

  async createPersisted(createTextDocDto: CreateTextDocDto) {
    if (!createTextDocDto.ragId) {
      throw new BadRequestException('RagId is required');
    }
    const textDoc = this.textDocRepository.create({
      ...createTextDocDto,
      rag: Reference.createFromPK(Rag, createTextDocDto.ragId),
    });
    await this.em.persistAndFlush(textDoc);
    await this.loadToVectorStoreBulk([textDoc]);
    return textDoc;
  }

  async findPage(pageOptionsDto: PageOptionsDto): Promise<PageDto<TextDoc>> {
    return this.textDocRepository.findPage(pageOptionsDto);
  }

  async findOneOrFail(id: number): Promise<TextDoc> {
    return this.textDocRepository.findOneOrFail(id, {
      failHandler: () => {
        throw new NotFoundException();
      },
    });
  }

  async update(id: number, updateTextDocDto: UpdateTextDocDto) {
    const textDoc = await this.findOneOrFail(id);
    wrap(textDoc).assign(updateTextDocDto);
    await this.em.persistAndFlush(textDoc);
    await this.loadToVectorStoreBulk([textDoc]);
    return textDoc;
  }

  async remove(id: number) {
    const textDoc = await this.findOneOrFail(id);
    await this.removeFromVectorStore(textDoc);
    await this.em.removeAndFlush(textDoc);
    return textDoc;
  }

  async removeFromVectorStore(textDoc: TextDoc) {
    await this.em.populate(textDoc, ['rag.chatBot.uuid']);
    const indexName = `${textDoc.rag.chatBot.uuid}-rag`;
    await this.langChainService.deleteDocuments(textDoc.id, indexName);
  }

  async loadToVectorStoreBulk(textDocs: TextDoc[]) {
    await this.em.populate(textDocs, ['rag.chatBot.uuid']);
    return this.textDocQueue.addBulk(
      textDocs.map((textDoc) => {
        const indexName = `${textDoc.rag.chatBot.uuid}-rag`;
        const document = new Document({
          pageContent: textDoc.text,
          metadata: {
            ...textDoc.metadata,
            id: textDoc.id,
          },
        });
        const jobData: ITextDocJobData = {
          id: document.metadata.id,
          document,
          indexName,
        };
        return {
          name: 'textDoc.loadToVectorStore',
          data: jobData,
        };
      }),
    );
  }
}
