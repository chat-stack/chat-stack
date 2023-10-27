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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiMixedResponse } from 'src/common/decorators/api-mixed-response.decorator';
import DatabaseExceptionFilter from 'src/common/exception-filters/database-exception.filter';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';
import { Role } from 'src/common/types/role.type';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';

import { FileDocService } from './file-doc.service';

import { CreateFileDocDto } from './dto/create-file-doc.dto';
import { FileDoc } from './entities/file-doc.entity';
import { UpdateFileDocDto } from './dto/update-file-doc.dto';

@ApiTags('FileDoc')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(Role.SERVICE)
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'file-doc',
  version: '1',
})
export class FileDocController {
  constructor(private readonly fileDocService: FileDocService) {}

  @Post()
  @ApiOperation({ summary: 'Create FileDoc' })
  @ApiMixedResponse(FileDoc)
  @UseFilters(DatabaseExceptionFilter)
  create(@Body() createFileDocDto: CreateFileDocDto) {
    return this.fileDocService.createPersisted(createFileDocDto);
  }

  @Get()
  @ApiOperation({ summary: 'List FileDocs' })
  @ApiPaginatedResponse(FileDoc)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FileDoc>> {
    return this.fileDocService.findPage(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get FileDoc' })
  @ApiMixedResponse(FileDoc)
  findOne(@Param('id') id: string) {
    return this.fileDocService.findOneOrFail(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update FileDoc' })
  @ApiMixedResponse(FileDoc)
  update(@Param('id') id: string, @Body() updateFileDocDto: UpdateFileDocDto) {
    return this.fileDocService.update(+id, updateFileDocDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove FileDoc' })
  @ApiMixedResponse(FileDoc)
  remove(@Param('id') id: string) {
    return this.fileDocService.remove(+id);
  }
}
