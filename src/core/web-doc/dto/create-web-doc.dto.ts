import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsUrl } from 'class-validator';

import { IsMetadata } from 'src/common/decorators/is-metadata.decorator';

export class CreateWebDocDto {
  @ApiProperty()
  @IsUrl()
  @IsString()
  url: string;

  @ApiProperty()
  @IsMetadata()
  @IsOptional()
  metadata?: Record<string, any>;
}
