import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

import { IsRecord } from 'src/common/decorators/is-record.decorator';

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
  @IsOptional()
  endCustomerId?: number;

  @ApiProperty()
  @IsRecord()
  @IsOptional()
  variables?: Record<string, string>;
}
