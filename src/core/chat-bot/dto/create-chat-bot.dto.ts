import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

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
  firstAssistantMessage: string = 'How can I help you?';
}
