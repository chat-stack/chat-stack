import { PartialType } from '@nestjs/mapped-types';

import { CreateChatHistoryDto } from './create-chat-history.dto';

export class UpdateChatHistoryDto extends PartialType(CreateChatHistoryDto) {}
