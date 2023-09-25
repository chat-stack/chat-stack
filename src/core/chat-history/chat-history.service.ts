import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { FilterQuery, FindOptions } from '@mikro-orm/core';

import { ChatHistory } from './entities/chat-history.entity';
import { TCreateChatHistoryFromSessionOptions } from './types/create-chat-history-from-session-options.type';

@Injectable()
export class ChatHistoryService {
  constructor(
    @InjectRepository(ChatHistory)
    private readonly chatHistoryRepository: EntityRepository<ChatHistory>,
  ) {}

  createFromSession(options: TCreateChatHistoryFromSessionOptions) {
    const chatHistory = this.chatHistoryRepository.create(options);
    return chatHistory;
  }

  async find<P extends string = never>(
    where: FilterQuery<ChatHistory>,
    options?: FindOptions<ChatHistory, P>,
  ) {
    return this.chatHistoryRepository.find(where, options);
  }
}
