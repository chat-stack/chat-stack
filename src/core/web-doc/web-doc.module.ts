import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { LangChainModule } from 'src/core/lang-chain/lang-chain.module';

import { WebDocService } from './web-doc.service';
import { WebDocController } from './web-doc.controller';
import { WebDocProcessor } from './web-doc.processor';

import { WebDoc } from './entities/web-doc.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([WebDoc]),
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
