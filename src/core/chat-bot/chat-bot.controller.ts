import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';
import { ApiMixedResponse } from 'src/common/decorators/api-mixed-response.decorator';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { Role } from 'src/core/role/types/role.type';

import { ChatBotService } from './chat-bot.service';

import { CreateChatBotDto } from './dto/create-chat-bot.dto';
import { ChatBot } from './entities/chat-bot.entity';

@ApiTags('ChatBots')
@UseGuards(RolesGuard)
@Roles(Role.SERVICE)
@UseGuards(JwtAuthGuard)
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
