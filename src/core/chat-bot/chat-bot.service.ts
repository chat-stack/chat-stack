import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';
import DatabaseExceptionFilter from 'src/common/exception-filters/database-exception.filter';
import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';

import { ChatBot } from './entities/chat-bot.entity';
import { CreateChatBotDto } from './dto/create-chat-bot.dto';

@Injectable()
export class ChatBotService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(ChatBot)
    private readonly chatBotRepository: CustomEntityRepository<ChatBot>,
  ) {}

  @UseFilters(DatabaseExceptionFilter)
  async create(createChatBotDto: CreateChatBotDto): Promise<ChatBot> {
    const chatBot = this.chatBotRepository.create(createChatBotDto);
    await this.em.persistAndFlush(chatBot);
    return chatBot;
  }

  async findPage(pageOptionsDto: PageOptionsDto): Promise<PageDto<ChatBot>> {
    return this.chatBotRepository.findPage(pageOptionsDto);
  }

  async findOneOrFail(id: number): Promise<ChatBot> {
    return this.chatBotRepository.findOneOrFail(id, {
      failHandler: () => {
        throw new NotFoundException();
      },
    });
  }
}