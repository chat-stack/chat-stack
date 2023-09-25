import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsString, IsUUID } from 'class-validator';

export class GetChatBotResponseDto {
  @ApiProperty()
  @IsInt()
  chatBotId: number;

  @ApiProperty()
  @IsUUID()
  @IsString()
  chatSessionDistinctId: string;

  @ApiProperty()
  @IsString()
  userMessage: string;

  @ApiProperty()
  @IsInt()
  endCustomerId?: number;
}
