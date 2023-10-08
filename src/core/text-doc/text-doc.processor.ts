import { Process, Processor } from '@nestjs/bull';

import { Job } from 'bull';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MikroORM, UseRequestContext, wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

import { LangChainService } from 'src/core/lang-chain/lang-chain.service';
import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';

import { ITextDocJobData } from './types/text-doc-job-data.interface';
import { TextDoc } from './entities/text-doc.entity';

@Processor('textDoc')
export class TextDocProcessor {
  constructor(
    private readonly orm: MikroORM, // usage with @UseRequestContext()
    private readonly em: EntityManager,
    @InjectRepository(TextDoc)
    private readonly textDocRepository: CustomEntityRepository<TextDoc>,
    private readonly langChainService: LangChainService,
  ) {}

  @UseRequestContext()
  @Process('textDoc.loadToVectorStore')
  async loadToVectorStore(job: Job) {
    const { id, document, indexName } = job.data as ITextDocJobData;
    const vectorStore = this.langChainService.createVectorStore({
      indexName,
    });
    await vectorStore.addDocuments([document]);
    const textDoc = await this.textDocRepository.findOne(id);
    if (textDoc) {
      wrap(textDoc).assign({
        loadedAt: new Date(),
      });
      await this.em.persistAndFlush(textDoc);
    }
  }
}
