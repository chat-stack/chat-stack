import { Injectable } from '@nestjs/common';

import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Document } from 'langchain/dist/document';
import { EntityManager } from '@mikro-orm/postgresql';
import { OpenSearchVectorStore } from 'langchain/vectorstores/opensearch';
import { Client as OpenSearchClient } from '@opensearch-project/opensearch';

import { Rag } from './entities/rag.entity';

@Injectable()
export class RagService {
  constructor(
    private readonly em: EntityManager,
    private readonly embeddings: OpenAIEmbeddings,
    private readonly openSearchClient: OpenSearchClient,
  ) {}
  async loadToVectorStore(rag: Rag) {
    await this.em.populate(rag, ['chatBot', 'textDocs']);
    const vectorStore = new OpenSearchVectorStore(this.embeddings, {
      client: this.openSearchClient,
      indexName: `${rag.chatBot.uuid}-rag`,
    });
    const docs = rag.textDocs.getItems().map((textDoc): Document => {
      return {
        pageContent: textDoc.pageContent,
        metadata: {
          ...textDoc.metadata,
          id: textDoc.id,
        },
      };
    });
    await vectorStore.addDocuments(docs);
  }
}
