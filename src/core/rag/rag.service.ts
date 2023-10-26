import { Injectable } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';

import { TextDocService } from 'src/core/text-doc/text-doc.service';
import { WebDocService } from 'src/core/web-doc/web-doc.service';
import { FileDocService } from 'src/core/file-doc/file-doc.service';

import { Rag } from './entities/rag.entity';

@Injectable()
export class RagService {
  constructor(
    private readonly em: EntityManager,
    private readonly textDocService: TextDocService,
    private readonly webDocService: WebDocService,
    private readonly fileDocService: FileDocService,
  ) {}
  async loadToVectorStore(rag: Rag) {
    await this.em.populate(rag, ['chatBot', 'textDocs', 'webDocs']);
    await Promise.allSettled([
      this.textDocService.loadToVectorStoreBulk(rag.textDocs.getItems()),
      this.webDocService.loadToVectorStoreBulk(rag.webDocs.getItems()),
      this.fileDocService.loadToVectorStoreBulk(rag.fileDocs.getItems()),
    ]);
  }
}
