import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsNumber, IsOptional, IsString } from 'class-validator';

import { IsMetadata } from 'src/common/decorators/is-metadata.decorator';

export class CreateTextDocDto {
  @ApiPropertyOptional()
  @IsNumber()
  ragId?: number;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiPropertyOptional()
  @IsMetadata()
  @IsOptional()
  metadata?: Record<string, any>;
}
