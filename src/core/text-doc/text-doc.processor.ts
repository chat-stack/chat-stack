import { Process, Processor } from '@nestjs/bull';

import { Job } from 'bull';

import { LangChainService } from 'src/core/lang-chain/lang-chain.service';

import { ITextDocJobData } from './types/text-doc-job-data.interface';

@Processor('textDoc')
export class TextDocProcessor {
  constructor(private readonly langChainService: LangChainService) {}

  @Process('textDoc.loadToVectorStore')
  async loadToVectorStore(job: Job) {
    const { document, indexName } = job.data as ITextDocJobData;
    const vectorStore = this.langChainService.createVectorStore({
      indexName,
    });
    return vectorStore.addDocuments([document]);
  }
}
