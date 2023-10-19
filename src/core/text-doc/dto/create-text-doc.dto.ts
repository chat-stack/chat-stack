import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

import { IsMetadata } from 'src/common/decorators/is-metadata.decorator';

export class CreateTextDocDto {
  @ApiProperty()
  @IsString()
  pageContent: string;

  @ApiProperty()
  @IsMetadata()
  @IsOptional()
  metadata?: Record<string, any>;
}
