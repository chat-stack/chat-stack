import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFileEntDto {
  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  fileDocId?: number;

  @ApiPropertyOptional({ default: './' })
  @IsString()
  @IsOptional()
  directoryPath? = './';

  @ApiProperty()
  @IsString()
  filename: string;

  @ApiProperty()
  @IsString()
  mimeType: string;
}
