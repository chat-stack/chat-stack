import { Injectable } from '@nestjs/common';

import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Loaded } from '@mikro-orm/core';
import { PromptTemplate } from 'langchain/prompts';

import { ChatHistoryService } from 'src/core/chat-history/chat-history.service';
import { ChatRole } from 'src/common/types/chat-role.type';
import { ChatBot } from 'src/core/chat-bot/entities/chat-bot.entity';
import { ChatHistory } from 'src/core/chat-history/entities/chat-history.entity';
import { EndCustomer } from 'src/core/end-customer/entities/end-customer.entity';
import { convertRecordValueToString } from 'src/common/util/convert-record-value-to-string';

import { ChatSession } from './entities/chat-session.entity';

@Injectable()
export class ChatSessionService {
  constructor(
    @InjectRepository(ChatSession)
    private readonly chatSessionRepository: EntityRepository<ChatSession>,
    private readonly em: EntityManager,
    private readonly chatHistoryService: ChatHistoryService,
  ) {}

  async findOneOrCreate(
    distinctId: string,
    chatBot: Loaded<ChatBot>,
    endCustomer?: Loaded<EndCustomer>,
    metadata?: Record<string, any>,
  ) {
    let chatSession = await this.chatSessionRepository.findOne({ distinctId });
    if (!chatSession) {
      chatSession = this.chatSessionRepository.create({
        chatBot,
        distinctId,
        endCustomer,
      });
      const chatHistories: ChatHistory[] = [];
      if (chatBot.promptTemplate) {
        chatHistories.push(
          this.chatHistoryService.createFromSession({
            chatSession,
            chatRole: ChatRole.SYSTEM,
            message: metadata
              ? await PromptTemplate.fromTemplate(
                  chatBot.promptTemplate,
                ).format(convertRecordValueToString(metadata))
              : chatBot.promptTemplate,
          }),
        );
      }
      chatHistories.push(
        this.chatHistoryService.createFromSession({
          chatSession,
          chatRole: ChatRole.ASSISTANT,
          message: chatBot.firstAssistantMessage,
        }),
      );
      chatSession.chatHistories.set(chatHistories);
      this.em.persistAndFlush(chatSession);
    }
    return chatSession;
  }
}
