import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

import { Job } from 'bull';
import { MikroORM, EntityManager, CreateRequestContext } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { LangChainService } from 'src/core/lang-chain/lang-chain.service';
import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';

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
    private readonly logger: Logger,
  ) {}

  @Process('fileDoc.loadToVectorStore')
  @CreateRequestContext()
  async loadToVectorStore(job: Job) {
    const { id, metadata, indexName } = job.data as IFileDocJobData;
    const vectorStore = this.langChainService.createVectorStore({
      indexName,
    });

    const fileDoc = this.fileDocRepository.findOne(id, { populate: ['file'] });
    if (!fileDoc) {
      this.logger.error({
        message: `fileDoc.loadToVectorStore: failed to find FileDoc id: ${id}`,
      });
      return;
    }

    // const loader = new PuppeteerWebBaseLoader(url, {
    //   launchOptions: {
    //     headless: 'new',
    //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
    //   },
    //   gotoOptions: {
    //     waitUntil: 'domcontentloaded',
    //   },
    // });
    // const docs = await loader.load();
    // const splitter = RecursiveCharacterTextSplitter.fromLanguage('html');
    // const transformer = new HtmlToTextTransformer();
    // const sequence = splitter.pipe(transformer);
    // const newDocs = (await sequence.invoke(docs)).filter(
    //   (doc) => doc.pageContent,
    // );
    // await vectorStore.addDocuments(
    //   newDocs.map((newDoc): Document<Record<string, any>> => {
    //     return {
    //       pageContent: newDoc.pageContent,
    //       metadata: {
    //         ...metadata,
    //         id: id,
    //         source: url,
    //       },
    //     };
    //   }),
    // );
    // const webDoc = await this.webDocRepository.findOne(id);
    // if (webDoc) {
    //   wrap(webDoc).assign({
    //     loadedAt: new Date(),
    //   });
    //   await this.em.persistAndFlush(webDoc);
    //   this.logger.log({
    //     message: `Finished loading webDoc ${webDoc.id}`,
    //     id: webDoc.id,
    //     url: webDoc.url,
    //   });
    // }
  }
}
