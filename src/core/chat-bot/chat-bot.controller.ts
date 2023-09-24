import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';
import { ApiMixedResponse } from 'src/common/decorators/api-mixed-response.decorator';

import { ChatBotService } from './chat-bot.service';

import { CreateChatBotDto } from './dto/create-chat-bot.dto';
import { ChatBot } from './entities/chat-bot.entity';

@ApiTags('ChatBots')
@Controller({
  path: 'chat-bot',
  version: '1',
})
export class ChatBotController {
  constructor(private readonly chatBotService: ChatBotService) {}

  @Post()
  @ApiOperation({ summary: 'Create a chat bot' })
  @ApiResponse({ status: 200, description: 'Success' })
  async create(@Body() createChatBotDto: CreateChatBotDto) {
    return this.chatBotService.create(createChatBotDto);
  }

  @Get()
  @ApiPaginatedResponse(ChatBot)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ChatBot>> {
    return this.chatBotService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiMixedResponse(ChatBot)
  findOne(@Param('id') id: string) {
    return this.chatBotService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatBotDto: UpdateChatBotDto) {
  //   return this.chatBotService.update(+id, updateChatBotDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatBotService.remove(+id);
  // }
}
