import { Controller } from '@nestjs/common';

import { ChatHistoryService } from './chat-history.service';

@Controller('chat-history')
export class ChatHistoryController {
  constructor(private readonly chatHistoryService: ChatHistoryService) {}

  // @Post()
  // create(@Body() createChatHistoryDto: CreateChatHistoryDto) {
  //   return this.chatHistoryService.create(createChatHistoryDto);
  // }

  // @Get()
  // findAll() {
  //   return this.chatHistoryService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatHistoryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateChatHistoryDto: UpdateChatHistoryDto,
  // ) {
  //   return this.chatHistoryService.update(+id, updateChatHistoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatHistoryService.remove(+id);
  // }
}
