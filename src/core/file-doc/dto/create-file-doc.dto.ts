import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsOptional } from 'class-validator';

import { IsMetadata } from 'src/common/decorators/is-metadata.decorator';

export class CreateFileDocDto {
  @ApiProperty()
  @IsNumber()
  ragId?: number;

  @ApiProperty()
  @IsNumber()
  fileId: number;

  @ApiProperty()
  @IsMetadata()
  @IsOptional()
  metadata?: Record<string, any>;
}
