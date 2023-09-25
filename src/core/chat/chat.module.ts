import { Module } from '@nestjs/common';

import { LangChainModule } from 'src/core/lang-chain/lang-chain.module';
import { ChatBotModule } from 'src/core/chat-bot/chat-bot.module';
import { ChatHistoryModule } from 'src/core/chat-history/chat-history.module';
import { ChatSessionModule } from 'src/core/chat-session/chat-session.module';
import { EndCustomerModule } from 'src/core/end-customer/end-customer.module';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [
    LangChainModule,
    ChatBotModule,
    ChatHistoryModule,
    ChatSessionModule,
    EndCustomerModule,
  ],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
