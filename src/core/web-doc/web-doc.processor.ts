import { Process, Processor } from '@nestjs/bull';

import { Job } from 'bull';
import { Document } from 'langchain/document';
import { PuppeteerWebBaseLoader } from 'langchain/document_loaders/web/puppeteer';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HtmlToTextTransformer } from 'langchain/document_transformers/html_to_text';
import { MikroORM, EntityManager, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { LangChainService } from 'src/core/lang-chain/lang-chain.service';
import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';

import { IWebDocJobData } from './types/web-doc-job-data.interface';
import { WebDoc } from './entities/web-doc.entity';

@Processor('textDoc')
export class WebDocProcessor {
  constructor(
    private readonly orm: MikroORM, // usage with @UseRequestContext()
    private readonly em: EntityManager,
    @InjectRepository(WebDoc)
    private readonly webDocRepository: CustomEntityRepository<WebDoc>,
    private readonly langChainService: LangChainService,
  ) {}

  @Process('webDoc.loadToVectorStore')
  async loadToVectorStore(job: Job) {
    const { id, url, metadata, indexName } = job.data as IWebDocJobData;
    const vectorStore = this.langChainService.createVectorStore({
      indexName,
    });
    const loader = new PuppeteerWebBaseLoader(url, {
      launchOptions: {
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
      gotoOptions: {
        waitUntil: 'domcontentloaded',
      },
    });
    const docs = await loader.load();
    const splitter = RecursiveCharacterTextSplitter.fromLanguage('html');
    const transformer = new HtmlToTextTransformer();
    const sequence = splitter.pipe(transformer);
    const newDocs = (await sequence.invoke(docs)).filter(
      (doc) => doc.pageContent,
    );
    await vectorStore.addDocuments(
      newDocs.map((newDoc): Document<Record<string, any>> => {
        return {
          pageContent: newDoc.pageContent,
          metadata: {
            ...metadata,
            id: id,
            source: url,
          },
        };
      }),
    );
    const webDoc = await this.webDocRepository.findOne(id);
    if (webDoc) {
      wrap(webDoc).assign({
        loadedAt: new Date(),
      });
      await this.em.persistAndFlush(webDoc);
    }
  }
}
