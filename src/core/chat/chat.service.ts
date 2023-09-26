import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EntityManager } from '@mikro-orm/postgresql';
import { QueryOrder } from '@mikro-orm/core';

import { ChatBotService } from 'src/core/chat-bot/chat-bot.service';
import { ChatSessionService } from 'src/core/chat-session/chat-session.service';
import { ChatHistoryService } from 'src/core/chat-history/chat-history.service';
import { ChatRole } from 'src/common/types/chat-role.type';
import { EndCustomerService } from 'src/core/end-customer/end-customer.service';
import { LangChainService } from 'src/core/lang-chain/lang-chain.service';
import { TLangChainConfig } from 'src/config/types/lang-chain.config.type';
import { IUserContext } from 'src/core/auth/types/user-context.interface';

import { GetChatBotResponseDto } from './dto/get-chat-bot-response.dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly em: EntityManager,
    private readonly chatBotService: ChatBotService,
    private readonly endCustomerService: EndCustomerService,
    private readonly chatSessionService: ChatSessionService,
    private readonly chatHistoryService: ChatHistoryService,
    private readonly langChainService: LangChainService,
    private readonly configService: ConfigService,
  ) {}
  async getChatBotResponse(
    userContext: IUserContext,
    getChatBotResponseDto: GetChatBotResponseDto,
  ) {
    const { endCustomerId } = userContext;
    const { chatBotId, chatSessionDistinctId, userMessage, metadata } =
      getChatBotResponseDto;
    const chatBot = await this.chatBotService.findOneOrFail(chatBotId);
    const endCustomer = endCustomerId
      ? await this.endCustomerService.findOneOrFail(endCustomerId)
      : undefined;
    const chatSession = await this.chatSessionService.findOneOrCreate(
      chatSessionDistinctId,
      chatBot,
      endCustomer,
      metadata,
    );
    const chatHistory = this.chatHistoryService.createFromSession({
      chatSession,
      chatRole: ChatRole.USER,
      message: userMessage,
    });
    await this.em.persistAndFlush(chatHistory);
    const chatHistoriesRevert = await this.chatHistoryService.find(
      {
        chatSession,
      },
      {
        orderBy: {
          id: QueryOrder.DESC,
        },
        limit:
          this.configService.get<TLangChainConfig>('langChain')
            ?.bufferWindowMemoryInput.k || 50,
      },
    );
    const chatHistories = chatHistoriesRevert.sort((a, b) => b.id - a.id);
    const llmChain = this.langChainService.createLLMChain({
      memory: this.langChainService.createBufferWindowMemory(chatHistories),
    });
    const result = await llmChain.call({
      input: userMessage,
    });
    const assistantChatHistory = this.chatHistoryService.createFromSession({
      chatSession,
      chatRole: ChatRole.ASSISTANT,
      message: result.text,
    });
    await this.em.persistAndFlush(assistantChatHistory);
    return result;
  }
}
