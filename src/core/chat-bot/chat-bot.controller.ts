import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
  UseFilters,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';
import { ApiMixedResponse } from 'src/common/decorators/api-mixed-response.decorator';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { Role } from 'src/common/types/role.type';
import DatabaseExceptionFilter from 'src/common/exception-filters/database-exception.filter';

import { ChatBotService } from './chat-bot.service';

import { CreateChatBotDto } from './dto/create-chat-bot.dto';
import { ChatBot } from './entities/chat-bot.entity';
import { UpdateChatBotDto } from './dto/update-chat-bot.dto';

@ApiTags('ChatBot')
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
  @ApiOperation({ summary: 'Create ChatBot' })
  @ApiMixedResponse(ChatBot)
  @UseFilters(DatabaseExceptionFilter)
  async create(@Body() createChatBotDto: CreateChatBotDto): Promise<ChatBot> {
    return this.chatBotService.create(createChatBotDto);
  }

  @Get()
  @ApiOperation({ summary: 'List ChatBots' })
  @ApiPaginatedResponse(ChatBot)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ChatBot>> {
    return this.chatBotService.findPage(pageOptionsDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get ChatBot' })
  @ApiMixedResponse(ChatBot)
  async findOne(@Param('uuid') uuid: string): Promise<ChatBot> {
    return this.chatBotService.findOneOrFail(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({ summary: 'Update ChatBot' })
  @ApiMixedResponse(ChatBot)
  async update(
    @Param('uuid') uuid: string,
    @Body() updateChatBotDto: UpdateChatBotDto,
  ) {
    return this.chatBotService.update(uuid, updateChatBotDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: 'Remove ChatBot' })
  @ApiMixedResponse(ChatBot)
  remove(@Param('uuid') uuid: string) {
    return this.chatBotService.remove(uuid);
  }
}
