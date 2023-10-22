import { Injectable, NotFoundException } from '@nestjs/common';

import { EntityManager, Reference, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';
import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';
import { RagService } from 'src/core/rag/rag.service';
import { FileDoc } from 'src/core/file-doc/entities/file-doc.entity';

import { ChatBot } from './entities/chat-bot.entity';
import { CreateChatBotDto } from './dto/create-chat-bot.dto';
import { UpdateChatBotDto } from './dto/update-chat-bot.dto';

@Injectable()
export class ChatBotService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(ChatBot)
    private readonly chatBotRepository: CustomEntityRepository<ChatBot>,
    private readonly ragService: RagService,
  ) {}

  async create(createChatBotDto: CreateChatBotDto): Promise<ChatBot> {
    const chatBot = this.chatBotRepository.create({
      ...createChatBotDto,
      rag: {
        ...createChatBotDto.rag,
        fileDocs: createChatBotDto.rag?.fileDocs?.map((fileDocDto) => {
          return {
            fileEnt: Reference.createFromPK(FileDoc, fileDocDto.fileId),
            ...fileDocDto,
          };
        }),
      },
    });
    await this.em.persistAndFlush(chatBot);
    if (chatBot.rag) {
      await this.ragService.loadToVectorStore(chatBot.rag);
    }
    return chatBot;
  }

  async findPage(pageOptionsDto: PageOptionsDto): Promise<PageDto<ChatBot>> {
    return this.chatBotRepository.findPage(pageOptionsDto);
  }

  async findOneOrFail(uuid: string): Promise<ChatBot> {
    return this.chatBotRepository.findOneOrFail(
      { uuid },
      {
        failHandler: () => {
          throw new NotFoundException();
        },
      },
    );
  }

  async update(uuid: string, updateChatBotDto: UpdateChatBotDto) {
    const chatBot = await this.findOneOrFail(uuid);
    wrap(chatBot).assign(updateChatBotDto);
    await this.em.persistAndFlush(chatBot);
    return chatBot;
  }

  async remove(uuid: string) {
    const chatBot = await this.findOneOrFail(uuid);
    await this.em.removeAndFlush(chatBot);
    return chatBot;
  }
}
