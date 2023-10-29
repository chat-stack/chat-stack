import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiMixedResponse } from 'src/common/decorators/api-mixed-response.decorator';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PageOptionsDto } from 'src/common/dto/page/page-option.dto';
import { PageDto } from 'src/common/dto/page/page.dto';
import { Role } from 'src/common/types/role.type';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';

import { ChatHistoryService } from './chat-history.service';

import { ChatHistory } from './entities/chat-history.entity';

@ApiTags('ChatHistory')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(Role.SERVICE)
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'chat-history',
  version: '1',
})
export class ChatHistoryController {
  constructor(private readonly chatHistoryService: ChatHistoryService) {}

  @Get()
  @ApiOperation({ summary: 'List ChatHistories' })
  @ApiPaginatedResponse(ChatHistory)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ChatHistory>> {
    return this.chatHistoryService.findPage(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ChatHistory' })
  @ApiMixedResponse(ChatHistory)
  findOne(@Param('id') id: string) {
    return this.chatHistoryService.findOneOrFail(+id);
  }
}
