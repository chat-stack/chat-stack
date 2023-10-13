import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { Queue } from 'bull';

import { WebDoc } from './entities/web-doc.entity';
import { IWebDocJobData } from './interfaces/web-doc-job-data.interface';

@Injectable()
export class WebDocService {
  constructor(
    @InjectQueue('webDoc')
    private readonly webDocQueue: Queue,
  ) {}

  async loadToVectorStoreBulk(webDocs: WebDoc[], indexName: string) {
    return this.webDocQueue.addBulk(
      webDocs.map((webDoc) => {
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
