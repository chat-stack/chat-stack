import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { ChatHistoryService } from './chat-history.service';
import { ChatHistoryController } from './chat-history.controller';

import { ChatHistory } from './entities/chat-history.entity';

@Module({
  imports: [MikroOrmModule.forFeature([ChatHistory])],
  controllers: [ChatHistoryController],
  providers: [ChatHistoryService],
  exports: [ChatHistoryService],
})
export class ChatHistoryModule {}
