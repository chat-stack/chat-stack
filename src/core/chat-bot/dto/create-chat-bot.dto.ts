import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsOptional, IsString } from 'class-validator';

import { ChatBotMode } from 'src/core/chat-bot/types/chatBotType.type';
import { CreateRagDto } from 'src/core/rag/dto/create-rag.dto';

export class CreateChatBotDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  promptTemplate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  firstAssistantMessage?: string;

  @ApiPropertyOptional({ enum: ChatBotMode, default: ChatBotMode.DEFAULT })
  @IsEnum(ChatBotMode)
  @IsOptional()
  mode: ChatBotMode = ChatBotMode.DEFAULT;

  @ApiPropertyOptional({ type: () => CreateRagDto })
  @IsOptional()
  rag?: CreateRagDto;
}
