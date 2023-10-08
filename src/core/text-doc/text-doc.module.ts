import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { LangChainModule } from 'src/core/lang-chain/lang-chain.module';

import { TextDocService } from './text-doc.service';
import { TextDocController } from './text-doc.controller';
import { TextDocProcessor } from './text-doc.processor';

import { TextDoc } from './entities/text-doc.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([TextDoc]),
    BullModule.registerQueue({
      name: 'textDoc',
    }),
    LangChainModule,
  ],
  controllers: [TextDocController],
  providers: [TextDocService, TextDocProcessor],
  exports: [TextDocService],
})
export class TextDocModule {}
