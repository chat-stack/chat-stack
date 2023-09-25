import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { ChatBotService } from './chat-bot.service';
import { ChatBotController } from './chat-bot.controller';

import { ChatBot } from './entities/chat-bot.entity';

@Module({
  imports: [MikroOrmModule.forFeature([ChatBot])],
  controllers: [ChatBotController],
  providers: [ChatBotService],
  exports: [ChatBotService],
})
export class ChatBotModule {}
