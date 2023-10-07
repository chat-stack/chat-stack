import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { LangChainModule } from 'src/core/lang-chain/lang-chain.module';

import { RagService } from './rag.service';
import { RagController } from './rag.controller';

import { Rag } from './entities/rag.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Rag]), LangChainModule],
  controllers: [RagController],
  providers: [RagService],
  exports: [RagService],
})
export class RagModule {}
