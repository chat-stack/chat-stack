import { Process, Processor } from '@nestjs/bull';

import { Job } from 'bull';
import { Document } from 'langchain/document';
import { PuppeteerWebBaseLoader } from 'langchain/document_loaders/web/puppeteer';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HtmlToTextTransformer } from 'langchain/document_transformers/html_to_text';

import { LangChainService } from 'src/core/lang-chain/lang-chain.service';

import { IWebDocJobData } from './types/web-doc-job-data.interface';

@Processor('textDoc')
export class WebDocProcessor {
  constructor(private readonly langChainService: LangChainService) {}

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
    return vectorStore.addDocuments(
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
  }
}
