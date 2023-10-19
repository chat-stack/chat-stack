import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsUrl } from 'class-validator';

import { isMetadata } from 'src/common/decorators/is-metadata.decorator';

export class CreateWebDocDto {
  //@ApiProperty()
  @IsUrl()
  @IsString()
  url: string;

  //@ApiProperty()
  @isMetadata()
  @IsOptional()
  metadata?: Record<string, any>;
}
