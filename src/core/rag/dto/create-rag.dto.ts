import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';

import { CreateFileDocDto } from 'src/core/file-doc/dto/create-file-doc.dto';
import { CreateTextDocDto } from 'src/core/text-doc/dto/create-text-doc.dto';
import { CreateWebDocDto } from 'src/core/web-doc/dto/create-web-doc.dto';

export class CreateRagDto {
  @ApiPropertyOptional({ type: () => CreateTextDocDto, isArray: true })
  @IsOptional()
  textDocs?: CreateTextDocDto[];

  @ApiPropertyOptional({ type: () => CreateWebDocDto, isArray: true })
  @IsOptional()
  webDocs?: CreateWebDocDto[];

  @ApiPropertyOptional({ type: () => CreateFileDocDto, isArray: true })
  @IsOptional()
  fileDocs?: CreateFileDocDto[];
}
