import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

import { IsRecord } from 'src/common/decorators/is-record.decorator';

export class GetChatBotResponseDto {
  @ApiProperty()
  @IsInt()
  chatBotId: number;

  @ApiProperty({
    example: 'f56c10b8-55a2-4e39-af78-f4419a0c0fd2',
    description:
      'This is a frontend distinct id that maintains a pointer of a unique anonymous chat session',
  })
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
  metadata?: Record<string, any>;
}
