import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';

import { TextDocService } from 'src/core/text-doc/text-doc.service';
import { WebDocService } from 'src/core/web-doc/web-doc.service';

import { Rag } from './entities/rag.entity';

@Injectable()
export class RagService {
  constructor(
    private readonly em: EntityManager,
    private readonly textDocService: TextDocService,
    private readonly webDocService: WebDocService,
  ) {}
  async loadToVectorStore(rag: Rag) {
    await this.em.populate(rag, ['chatBot', 'textDocs', 'webDocs']);
    const indexName = `${rag.chatBot.uuid}-rag`;
    await this.textDocService.loadToVectorStoreBulk(
      rag.textDocs.getItems(),
      indexName,
    );
    await this.webDocService.loadToVectorStoreBulk(
      rag.webDocs.getItems(),
      indexName,
    );
  }
}
