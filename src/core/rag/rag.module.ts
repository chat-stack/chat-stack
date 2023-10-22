import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { LangChainModule } from 'src/core/lang-chain/lang-chain.module';
import { TextDocModule } from 'src/core/text-doc/text-doc.module';
import { WebDocModule } from 'src/core/web-doc/web-doc.module';
import { FileDocModule } from 'src/core/file-doc/file-doc.module';

import { RagService } from './rag.service';
import { RagController } from './rag.controller';

import { Rag } from './entities/rag.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([Rag]),
    LangChainModule,
    TextDocModule,
    WebDocModule,
    FileDocModule,
  ],
  controllers: [RagController],
  providers: [RagService],
  exports: [RagService],
})
export class RagModule {}
