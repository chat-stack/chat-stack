import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { LangChainModule } from 'src/core/lang-chain/lang-chain.module';

import { WebDocService } from './web-doc.service';
import { WebDocController } from './web-doc.controller';
import { WebDocProcessor } from './web-doc.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'webDoc',
    }),
    LangChainModule,
  ],
  controllers: [WebDocController],
  providers: [WebDocService, WebDocProcessor],
  exports: [WebDocService],
})
export class WebDocModule {}
