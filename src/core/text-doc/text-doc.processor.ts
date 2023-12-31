import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

import { Job } from 'bull';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateRequestContext, MikroORM, wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

import { LangChainService } from 'src/core/lang-chain/lang-chain.service';
import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';

import { ITextDocJobData } from './interfaces/text-doc-job-data.interface';
import { TextDoc } from './entities/text-doc.entity';

@Processor('textDoc')
export class TextDocProcessor {
  constructor(
    private readonly orm: MikroORM, // usage with @CreateRequestContext()
    private readonly em: EntityManager,
    @InjectRepository(TextDoc)
    private readonly textDocRepository: CustomEntityRepository<TextDoc>,
    private readonly langChainService: LangChainService,
    private readonly logger: Logger,
  ) {}

  @Process('textDoc.loadToVectorStore')
  @CreateRequestContext()
  async loadToVectorStore(job: Job) {
    const { id, document, indexName } = job.data as ITextDocJobData;
    const vectorStore = this.langChainService.createVectorStore({
      indexName,
    });
    // first make sure existing docs with same id is removed
    await this.langChainService.deleteDocuments(id, indexName);

    await vectorStore.addDocuments([document]);
    const textDoc = await this.textDocRepository.findOne(id);
    if (textDoc) {
      wrap(textDoc).assign({
        loadedAt: new Date(),
      });
      await this.em.persistAndFlush(textDoc);
      this.logger.log({
        message: `Finished loading textDoc ${textDoc.id}`,
        id: textDoc.id,
      });
    }
  }

  captureError(job: Job) {
    this.logger.error({
      message: `${job.failedReason?.split('\n')[0]}`,
      stack: job.stacktrace,
    });
  }

  @OnQueueError()
  async onError(job: Job) {
    this.captureError(job);
  }

  @OnQueueFailed()
  async onFail(job: Job) {
    this.captureError(job);
  }
}
