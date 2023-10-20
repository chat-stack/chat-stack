import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFileEntDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  fileDocId?: number;

  @ApiProperty()
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
