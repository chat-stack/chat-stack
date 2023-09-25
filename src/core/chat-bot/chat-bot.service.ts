import { Injectable, NotFoundException } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';
import { PageMetaDto } from 'src/common/dto/page/page-meta.dto';

import { ChatBot } from './entities/chat-bot.entity';
import { CreateChatBotDto } from './dto/create-chat-bot.dto';

@Injectable()
export class ChatBotService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(ChatBot)
    private readonly chatBotRepository: EntityRepository<ChatBot>,
  ) {}

  async create(createChatBotDto: CreateChatBotDto): Promise<ChatBot> {
    const chatBot = this.chatBotRepository.create(createChatBotDto);
    await this.em.persistAndFlush(chatBot);
    return chatBot;
  }

  async findAllPaginated(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ChatBot>> {
    const { skip, take, order } = pageOptionsDto;
    const [items, itemCount] = await this.chatBotRepository.findAndCount(
      {},
      {
        orderBy: {
          id: order,
        },
        offset: skip,
        limit: take,
      },
    );
    return new PageDto(
      items,
      new PageMetaDto({
        itemCount,
        pageOptionsDto,
      }),
    );
  }

  async findOneOrFail(id: number): Promise<ChatBot> {
    return this.chatBotRepository.findOneOrFail(id, {
      failHandler: () => {
        throw new NotFoundException();
      },
    });
  }
}
