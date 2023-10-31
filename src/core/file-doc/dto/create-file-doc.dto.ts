import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsNumber, IsOptional } from 'class-validator';

import { IsMetadata } from 'src/common/decorators/is-metadata.decorator';

export class CreateFileDocDto {
  @ApiPropertyOptional()
  @IsNumber()
  ragId?: number;

  @ApiProperty()
  @IsNumber()
  fileId: number;

  @ApiPropertyOptional()
  @IsMetadata()
  @IsOptional()
  metadata?: Record<string, any>;
}
