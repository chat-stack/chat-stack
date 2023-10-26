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
import { Rag } from 'src/core/rag/entities/rag.entity';
import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';
import { LangChainService } from 'src/core/lang-chain/lang-chain.service';

import { CreateWebDocDto } from './dto/create-web-doc.dto';
import { IWebDocJobData } from './interfaces/web-doc-job-data.interface';
import { WebDoc } from './entities/web-doc.entity';
import { UpdateWebDocDto } from './dto/update-web-doc.dto';

@Injectable()
export class WebDocService {
  constructor(
    @InjectQueue('webDoc')
    private readonly webDocQueue: Queue,
    private readonly em: EntityManager,
    @InjectRepository(WebDoc)
    private readonly webDocRepository: CustomEntityRepository<WebDoc>,
    private readonly langChainService: LangChainService,
  ) {}

  async createPersisted(createWebDocDto: CreateWebDocDto) {
    if (!createWebDocDto.ragId) {
      throw new BadRequestException('RagId is required');
    }
    const webDoc = this.webDocRepository.create({
      ...createWebDocDto,
      rag: Reference.createFromPK(Rag, createWebDocDto.ragId),
    });
    await this.em.persistAndFlush(webDoc);
    await this.loadToVectorStoreBulk([webDoc]);
    return webDoc;
  }

  async findPage(pageOptionsDto: PageOptionsDto): Promise<PageDto<WebDoc>> {
    return this.webDocRepository.findPage(pageOptionsDto);
  }

  async findOneOrFail(id: number): Promise<WebDoc> {
    return this.webDocRepository.findOneOrFail(id, {
      failHandler: () => {
        throw new NotFoundException();
      },
    });
  }

  async update(id: number, updateWebDocDto: UpdateWebDocDto) {
    const webDoc = await this.findOneOrFail(id);
    wrap(webDoc).assign(updateWebDocDto);
    await this.em.persistAndFlush(webDoc);
    await this.loadToVectorStoreBulk([webDoc]);
    return webDoc;
  }

  async remove(id: number) {
    const webDoc = await this.findOneOrFail(id);
    await this.removeFromVectorStore(webDoc);
    await this.em.removeAndFlush(webDoc);
    return webDoc;
  }

  async removeFromVectorStore(webDoc: WebDoc) {
    await this.em.populate(webDoc, ['rag.chatBot.uuid']);
    const indexName = `${webDoc.rag.chatBot.uuid}-rag`;
    await this.langChainService.deleteDocuments(webDoc.id, indexName);
  }

  async loadToVectorStoreBulk(webDocs: WebDoc[]) {
    await this.em.populate(webDocs, ['rag.chatBot.uuid']);
    return this.webDocQueue.addBulk(
      webDocs.map((webDoc) => {
        const indexName = `${webDoc.rag.chatBot.uuid}-rag`;
        const jobData: IWebDocJobData = {
          id: webDoc.id,
          url: webDoc.url,
          metadata: webDoc.metadata,
          indexName,
        };
        return {
          name: 'webDoc.loadToVectorStore',
          data: jobData,
        };
      }),
    );
  }
}
