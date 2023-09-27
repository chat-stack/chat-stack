import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiMixedResponse } from 'src/common/decorators/api-mixed-response.decorator';
import { ChatHistory } from 'src/core/chat-history/entities/chat-history.entity';
import { Role } from 'src/common/types/role.type';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';
import CurrentUser from 'src/core/auth/decorators/current-user.decorator';
import { IUserContext } from 'src/core/auth/types/user-context.interface';

import { ChatService } from './chat.service';

import { GetChatBotResponseDto } from './dto/get-chat-bot-response.dto';

@ApiTags('Chat')
@UseGuards(RolesGuard)
@Roles(Role.SERVICE, Role.END_CUSTOMER, Role.ANON)
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'chat',
  version: '1',
})
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: 'Message ChatBot and create Chat' })
  @ApiMixedResponse(ChatHistory)
  @HttpCode(200)
  async getChatBotResponse(
    @CurrentUser() userContext: IUserContext,
    @Body() getChatBotResponseDto: GetChatBotResponseDto,
  ) {
    return this.chatService.getChatBotResponse(
      userContext,
      getChatBotResponseDto,
    );
  }
}
