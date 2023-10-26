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

import { WebDocService } from './web-doc.service';

import { CreateWebDocDto } from './dto/create-web-doc.dto';
import { WebDoc } from './entities/web-doc.entity';
import { UpdateWebDocDto } from './dto/update-web-doc.dto';

@ApiTags('WebDoc')
@UseGuards(RolesGuard)
@Roles(Role.SERVICE)
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'web-doc',
  version: '1',
})
export class WebDocController {
  constructor(private readonly webDocService: WebDocService) {}

  @Post()
  @ApiOperation({ summary: 'Create WebDoc' })
  @ApiMixedResponse(WebDoc)
  @UseFilters(DatabaseExceptionFilter)
  create(@Body() createWebDocDto: CreateWebDocDto) {
    return this.webDocService.createPersisted(createWebDocDto);
  }

  @Get()
  @ApiOperation({ summary: 'List WebDocs' })
  @ApiPaginatedResponse(WebDoc)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<WebDoc>> {
    return this.webDocService.findPage(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get WebDoc' })
  @ApiMixedResponse(WebDoc)
  findOne(@Param('id') id: string) {
    return this.webDocService.findOneOrFail(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update WebDoc' })
  @ApiMixedResponse(WebDoc)
  update(@Param('id') id: string, @Body() updateWebDocDto: UpdateWebDocDto) {
    return this.webDocService.update(+id, updateWebDocDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove WebDoc' })
  @ApiMixedResponse(WebDoc)
  remove(@Param('id') id: string) {
    return this.webDocService.remove(+id);
  }
}
