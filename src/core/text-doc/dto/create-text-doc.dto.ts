import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

import { isMetadata } from 'src/common/decorators/is-metadata.decorator';

export class CreateTextDocDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  pageContent: string;

  @ApiProperty()
  @isMetadata()
  @IsOptional()
  metadata?: Record<string, any>;
}
