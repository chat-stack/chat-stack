import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { Queue } from 'bull';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Document } from 'langchain/document';

import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';

import { TextDoc } from './entities/text-doc.entity';
import { ITextDocJobData } from './interfaces/text-doc-job-data.interface';

@Injectable()
export class TextDocService {
  constructor(
    @InjectRepository(TextDoc)
    private readonly textDocRepository: CustomEntityRepository<TextDoc>,
    @InjectQueue('textDoc')
    private readonly textDocQueue: Queue,
  ) {}

  async loadToVectorStoreBulk(textDocs: TextDoc[], indexName: string) {
    const documents = textDocs.map((textDoc) => {
      return new Document({
        pageContent: textDoc.text,
        metadata: {
          ...textDoc.metadata,
          id: textDoc.id,
        },
      });
    });
    return this.textDocQueue.addBulk(
      documents.map((document) => {
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
