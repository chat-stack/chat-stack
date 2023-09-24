import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreateChatBotDto {
  @IsString()
  @ApiProperty()
  name: string;
}
