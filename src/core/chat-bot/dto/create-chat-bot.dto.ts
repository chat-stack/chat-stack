import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreateChatBotDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  promptTemplate?: string;

  @ApiProperty()
  @IsString()
  firstAssistantMessage: string = 'How can I help you?';
}
