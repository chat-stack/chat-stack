import { ApiProperty } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';

import { CreateTextDocDto } from 'src/core/text-doc/dto/create-text-doc.dto';

export class CreateRagDto {
  @ApiProperty({ type: CreateTextDocDto, isArray: true })
  @IsOptional()
  textDocs?: CreateTextDocDto[];
}
