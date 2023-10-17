import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { ChatHistoryModule } from 'src/core/chat-history/chat-history.module';

import { ChatSessionService } from './chat-session.service';
import { ChatSessionController } from './chat-session.controller';

import { ChatSession } from './entities/chat-session.entity';

@Module({
  imports: [MikroOrmModule.forFeature([ChatSession]), ChatHistoryModule],
  controllers: [ChatSessionController],
  providers: [ChatSessionService],
  exports: [ChatSessionService],
})
export class ChatSessionModule {}
