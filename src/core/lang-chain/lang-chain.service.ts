import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Loaded } from '@mikro-orm/core';
import { BufferWindowMemory, ChatMessageHistory } from 'langchain/memory';
import { SystemMessage, AIMessage, HumanMessage } from 'langchain/schema';
import {
  ConversationalRetrievalQAChain,
  ConversationalRetrievalQAChainInput,
  LLMChain,
  LLMChainInput,
  QAChainParams,
} from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import {
  OpenSearchClientArgs,
  OpenSearchVectorStore,
} from 'langchain/vectorstores/opensearch';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Client as OpenSearchClient } from '@opensearch-project/opensearch';
import { BaseLanguageModel } from 'langchain/dist/base_language';
import { BaseRetriever } from 'langchain/dist/schema/retriever';

import { ChatRole } from 'src/common/types/chat-role.type';
import { ChatHistory } from 'src/core/chat-history/entities/chat-history.entity';
import { TLangChainConfig } from 'src/config/types/lang-chain.config.type';

@Injectable()
export class LangChainService {
  constructor(
    private readonly configService: ConfigService,
    private readonly model: ChatOpenAI,
    private readonly embeddings: OpenAIEmbeddings,
    private readonly openSearchClient: OpenSearchClient,
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
      memoryKey: 'chat_history',
    });
  }

  createLLMChain(llmInput?: Partial<LLMChainInput>) {
    return new LLMChain({
      llm: this.model,
      prompt: PromptTemplate.fromTemplate('{input}'),
      verbose: true,
      ...llmInput,
    });
  }

  createVectorStore(args?: Partial<OpenSearchClientArgs>) {
    return new OpenSearchVectorStore(this.embeddings, {
      client: this.openSearchClient,
      ...args,
    });
  }

  createConversationalRetrievalQAChainFromLLM(
    retriever: BaseRetriever,
    llm?: BaseLanguageModel,
    options?: {
      outputKey?: string;
      returnSourceDocuments?: boolean;
      questionGeneratorChainOptions?: {
        llm?: BaseLanguageModel;
        template?: string;
      };
      qaChainOptions?: QAChainParams;
    } & Omit<
      ConversationalRetrievalQAChainInput,
      'retriever' | 'combineDocumentsChain' | 'questionGeneratorChain'
    >,
  ) {
    return ConversationalRetrievalQAChain.fromLLM(
      llm || this.model,
      retriever,
      options,
    );
  }
}
