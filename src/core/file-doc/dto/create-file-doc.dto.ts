import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsUUID } from 'class-validator';

import { IsMetadata } from 'src/common/decorators/is-metadata.decorator';

export class CreateFileDocDto {
  @ApiProperty()
  @IsUUID()
  @IsString()
  fileUuid: string;

  @ApiProperty()
  @IsMetadata()
  @IsOptional()
  metadata?: Record<string, any>;
}
