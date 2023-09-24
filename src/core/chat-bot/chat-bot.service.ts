import { Injectable } from '@nestjs/common';

import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

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
    const chatBot = this.chatBotRepository.create({
      ...new ChatBot(),
      ...createChatBotDto,
    });
    await this.em.persistAndFlush(chatBot);
    return chatBot;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<ChatBot>> {
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
}
