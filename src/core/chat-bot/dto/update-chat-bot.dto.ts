import { PartialType } from '@nestjs/mapped-types';

import { CreateChatBotDto } from './create-chat-bot.dto';

export class UpdateChatBotDto extends PartialType(CreateChatBotDto) {}
