import { ChatRole } from 'src/common/types/chat-role.type';
import { ChatSession } from 'src/core/chat-session/entities/chat-session.entity';

export type TCreateChatHistoryFromSessionOptions = {
  chatSession: ChatSession;
  chatRole: ChatRole;
  message: string;
};
