import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsUUID } from 'class-validator';

import { isMetadata } from 'src/common/decorators/is-metadata.decorator';

export class GetChatBotResponseDto {
  @ApiProperty()
  @IsUUID()
  chatBotUuid: string;

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
  @isMetadata()
  @IsOptional()
  metadata?: Record<string, any>;
}
