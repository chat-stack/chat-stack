import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';

import { Queue } from 'bull';

import { FileDoc } from './entities/file-doc.entity';
import { IFileDocJobData } from './interfaces/file-doc-job-data.interface';

@Injectable()
export class FileDocService {
  constructor(
    @InjectQueue('fileDoc')
    private readonly fileDocQueue: Queue,
  ) {}

  async loadToVectorStoreBulk(fileDocs: FileDoc[], indexName: string) {
    return this.fileDocQueue.addBulk(
      fileDocs.map((fileDoc) => {
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
