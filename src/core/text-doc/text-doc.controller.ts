import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiMixedResponse } from 'src/common/decorators/api-mixed-response.decorator';
import DatabaseExceptionFilter from 'src/common/exception-filters/database-exception.filter';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';
import { Role } from 'src/common/types/role.type';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';

import { TextDocService } from './text-doc.service';

import { CreateTextDocDto } from './dto/create-text-doc.dto';
import { UpdateTextDocDto } from './dto/update-text-doc.dto';
import { TextDoc } from './entities/text-doc.entity';

@ApiTags('TextDoc')
@UseGuards(RolesGuard)
@Roles(Role.SERVICE)
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'text-doc',
  version: '1',
})
export class TextDocController {
  constructor(private readonly textDocService: TextDocService) {}

  @Post()
  @ApiOperation({ summary: 'Create TextDoc' })
  @ApiMixedResponse(TextDoc)
  @UseFilters(DatabaseExceptionFilter)
  create(@Body() createTextDocDto: CreateTextDocDto) {
    return this.textDocService.createPersisted(createTextDocDto);
  }

  @Get()
  @ApiOperation({ summary: 'List TextDocs' })
  @ApiPaginatedResponse(TextDoc)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<TextDoc>> {
    return this.textDocService.findPage(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get TextDoc' })
  @ApiMixedResponse(TextDoc)
  findOne(@Param('id') id: string) {
    return this.textDocService.findOneOrFail(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update TextDoc' })
  @ApiMixedResponse(TextDoc)
  update(@Param('id') id: string, @Body() updateTextDocDto: UpdateTextDocDto) {
    return this.textDocService.update(+id, updateTextDocDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove TextDoc' })
  @ApiMixedResponse(TextDoc)
  remove(@Param('id') id: string) {
    return this.textDocService.remove(+id);
  }
}
