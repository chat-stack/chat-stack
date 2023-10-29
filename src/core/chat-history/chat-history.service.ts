import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@mikro-orm/nestjs';
import { FilterQuery, FindOptions } from '@mikro-orm/core';

import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';
import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';

import { ChatHistory } from './entities/chat-history.entity';
import { TCreateChatHistoryFromSessionOptions } from './types/create-chat-history-from-session-options.type';

@Injectable()
export class ChatHistoryService {
  constructor(
    @InjectRepository(ChatHistory)
    private readonly chatHistoryRepository: CustomEntityRepository<ChatHistory>,
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

  async findPage(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ChatHistory>> {
    return this.chatHistoryRepository.findPage(pageOptionsDto);
  }

  async findOneOrFail(id: number): Promise<ChatHistory> {
    return this.chatHistoryRepository.findOneOrFail(
      { id },
      {
        failHandler: () => {
          throw new NotFoundException();
        },
      },
    );
  }
}
