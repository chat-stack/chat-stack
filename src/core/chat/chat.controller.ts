import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiMixedResponse } from 'src/common/decorators/api-mixed-response.decorator';
import { ChatHistory } from 'src/core/chat-history/entities/chat-history.entity';

import { ChatService } from './chat.service';

import { GetChatBotResponseDto } from './dto/get-chat-bot-response.dto';

@ApiTags('Chat')
@Controller({
  path: 'chat',
  version: '1',
})
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: 'Message and get response from a chat bot' })
  @ApiMixedResponse(ChatHistory)
  async getChatBotResponse(
    @Body() getChatBotResponseDto: GetChatBotResponseDto,
  ) {
    return this.chatService.getChatBotResponse(getChatBotResponseDto);
  }
}
