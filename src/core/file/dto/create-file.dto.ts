import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  fileDocId?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  directoryPath? = 'default';

  @ApiProperty()
  @IsString()
  filename: string;

  @ApiProperty()
  @IsString()
  mimeType: string;
}
