import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

import { Job } from 'bull';
import {
  MikroORM,
  EntityManager,
  CreateRequestContext,
  wrap,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/document';

import { LangChainService } from 'src/core/lang-chain/lang-chain.service';
import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';
import { FileStorageService } from 'src/integrations/file-storage/file-storage.service';

import { FileDoc } from './entities/file-doc.entity';
import { IFileDocJobData } from './interfaces/file-doc-job-data.interface';

@Processor('fileDoc')
export class FileDocProcessor {
  constructor(
    private readonly orm: MikroORM, // usage with @CreateRequestContext()
    private readonly em: EntityManager,
    @InjectRepository(FileDoc)
    private readonly fileDocRepository: CustomEntityRepository<FileDoc>,
    private readonly langChainService: LangChainService,
    private readonly fileStorageService: FileStorageService,
    private readonly logger: Logger,
  ) {}

  @Process('fileDoc.loadToVectorStore')
  @CreateRequestContext()
  async loadToVectorStore(job: Job) {
    const { id, metadata, indexName } = job.data as IFileDocJobData;
    const vectorStore = this.langChainService.createVectorStore({
      indexName,
    });

    const fileDoc = await this.fileDocRepository.findOne(id, {
      populate: ['fileEnt'],
    });
    if (!fileDoc) {
      this.logger.error({
        message: `fileDoc.loadToVectorStore: failed to find FileDoc id: ${id}`,
      });
      return;
    }
    const file = await this.fileStorageService.readFile({
      filename: fileDoc.fileEnt.filename,
      directoryPath: fileDoc.fileEnt.directoryPath,
    });

    // Create an array to store the chunks of data
    const fileChunks: any[] = [];

    // Listen for 'data' events on the Readable stream
    file.on('data', (chunk) => {
      // Append the data chunk to the array
      fileChunks.push(chunk);
    });

    // Listen for the 'end' event to know when all data has been read
    file.on('end', async () => {
      // Combine the data chunks into a single Buffer
      const fileBuffer = Buffer.concat(fileChunks);

      const text = fileBuffer.toString('utf8');
      const splitter = new RecursiveCharacterTextSplitter();

      const docs = (await splitter.createDocuments([text])).filter(
        (doc) => doc.pageContent,
      );
      await vectorStore.addDocuments(
        docs.map((newDoc): Document<Record<string, any>> => {
          return {
            pageContent: newDoc.pageContent,
            metadata: {
              ...metadata,
              id: id,
            },
          };
        }),
      );
      wrap(fileDoc).assign({
        loadedAt: new Date(),
      });
      await this.em.persistAndFlush(fileDoc);
      this.logger.log({
        message: `Finished loading fileDoc ${fileDoc.id}`,
        id: fileDoc.id,
        filename: fileDoc.fileEnt.filename,
      });
    });

    // Handle any errors that might occur
    file.on('error', (err) => {
      this.logger.error({
        message: `fileDoc.loadToVectorStore: failed to read file, FileDoc id: ${id}`,
        err,
      });
    });
  }
}
