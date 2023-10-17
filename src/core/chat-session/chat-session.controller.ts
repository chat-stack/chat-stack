import { Controller } from '@nestjs/common';

import { ChatSessionService } from './chat-session.service';

@Controller('chat-session')
export class ChatSessionController {
  constructor(private readonly chatSessionService: ChatSessionService) {}

  // @Post()
  // create(@Body() createChatSessionDto: CreateChatSessionDto) {
  //   return this.chatSessionService.create(createChatSessionDto);
  // }

  // @Get()
  // findAll() {
  //   return this.chatSessionService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatSessionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateChatSessionDto: UpdateChatSessionDto,
  // ) {
  //   return this.chatSessionService.update(+id, updateChatSessionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatSessionService.remove(+id);
  // }
}
