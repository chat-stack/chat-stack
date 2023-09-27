import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsOptional, IsString } from 'class-validator';

import { ChatBotMode } from 'src/core/chat-bot/types/chatBotType.type';

export class CreateChatBotDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  promptTemplate?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  firstAssistantMessage?: string;

  @ApiProperty()
  @IsEnum(ChatBotMode)
  @IsOptional()
  mode: ChatBotMode = ChatBotMode.DEFAULT;
}
