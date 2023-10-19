import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { ChatRole } from 'src/common/types/chat-role.type';

export class CreateChatHistoryDto {
  //@ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  chatSessionId: number;

  //@ApiProperty()
  @IsNotEmpty()
  @IsEnum(ChatRole)
  chatRole: ChatRole;

  //@ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
}
