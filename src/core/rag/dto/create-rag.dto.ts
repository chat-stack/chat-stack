import { ApiProperty } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';

import { CreateFileDocDto } from 'src/core/file-doc/dto/create-file-doc.dto';
import { CreateTextDocDto } from 'src/core/text-doc/dto/create-text-doc.dto';
import { CreateWebDocDto } from 'src/core/web-doc/dto/create-web-doc.dto';

export class CreateRagDto {
  @ApiProperty({ type: () => CreateTextDocDto, isArray: true })
  @IsOptional()
  textDocs?: CreateTextDocDto[];

  @ApiProperty({ type: () => CreateWebDocDto, isArray: true })
  @IsOptional()
  webDocs?: CreateWebDocDto[];

  @ApiProperty({ type: () => CreateFileDocDto, isArray: true })
  @IsOptional()
  fileDocs?: CreateFileDocDto[];
}
