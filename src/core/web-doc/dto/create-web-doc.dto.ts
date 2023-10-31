import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

import { IsMetadata } from 'src/common/decorators/is-metadata.decorator';

export class CreateWebDocDto {
  @ApiPropertyOptional()
  @IsNumber()
  ragId?: number;

  @ApiProperty()
  @IsUrl()
  @IsString()
  url: string;

  @ApiPropertyOptional()
  @IsMetadata()
  @IsOptional()
  metadata?: Record<string, any>;
}
