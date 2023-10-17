import { InternalServerErrorException } from '@nestjs/common';

import { Loaded } from '@mikro-orm/core';
import { BufferWindowMemory, ChatMessageHistory } from 'langchain/memory';
import { AIMessage, HumanMessage, SystemMessage } from 'langchain/schema';

import { ChatHistory } from 'src/core/chat-history/entities/chat-history.entity';
import { ChatRole } from 'src/common/types/chat-role.type';

export function createChatMessageHistory(chatHistories: Loaded<ChatHistory>[]) {
  return new ChatMessageHistory(
    chatHistories.map((chatHistory) => {
      switch (chatHistory.chatRole) {
        case ChatRole.SYSTEM:
          return new SystemMessage(chatHistory.message);
        case ChatRole.ASSISTANT:
          return new AIMessage(chatHistory.message);
        case ChatRole.USER:
          return new HumanMessage(chatHistory.message);
        default:
          throw new InternalServerErrorException(
            `Unknown ChatRole from chatHistory id: ${chatHistory.id}`,
          );
      }
    }),
  );
}
export function createBufferWindowMemory(chatHistories: Loaded<ChatHistory>[]) {
  return new BufferWindowMemory({
    chatHistory: createChatMessageHistory(chatHistories),
    k: 50,
  });
}
