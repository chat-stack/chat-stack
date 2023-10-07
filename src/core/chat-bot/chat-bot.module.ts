import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { RagModule } from 'src/core/rag/rag.module';

import { ChatBotService } from './chat-bot.service';
import { ChatBotController } from './chat-bot.controller';

import { ChatBot } from './entities/chat-bot.entity';

@Module({
  imports: [MikroOrmModule.forFeature([ChatBot]), RagModule],
  controllers: [ChatBotController],
  providers: [
    ChatBotService,
    {
      provide: 'OBJECT_NAME',
      useValue: 'ChatBot',
    },
  ],
  exports: [ChatBotService],
})
export class ChatBotModule {}
