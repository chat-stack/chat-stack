import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Loaded } from '@mikro-orm/core';
import { BufferWindowMemory, ChatMessageHistory } from 'langchain/memory';
import { SystemMessage, AIMessage, HumanMessage } from 'langchain/schema';
import { LLMChain, LLMChainInput } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';

import { ChatRole } from 'src/common/types/chat-role.type';
import { ChatHistory } from 'src/core/chat-history/entities/chat-history.entity';
import { TLangChainConfig } from 'src/config/types/lang-chain.config.type';

@Injectable()
export class LangChainService {
  constructor(
    private readonly configService: ConfigService,
    private readonly model: ChatOpenAI,
  ) {}

  createChatMessageHistory(chatHistories: Loaded<ChatHistory>[]) {
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

  createBufferWindowMemory(chatHistories: Loaded<ChatHistory>[]) {
    return new BufferWindowMemory({
      ...this.configService.get<TLangChainConfig>('langChain')
        ?.bufferWindowMemoryInput,
      chatHistory: this.createChatMessageHistory(chatHistories),
    });
  }

  createLLMChain(llmInput: Partial<LLMChainInput>) {
    return new LLMChain({
      llm: this.model,
      prompt: PromptTemplate.fromTemplate('{input}'),
      verbose: true,
      ...llmInput,
    });
  }
}
