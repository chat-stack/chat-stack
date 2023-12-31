import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Client as OpenSearchClient } from '@opensearch-project/opensearch';

import { TLangChainConfig } from 'src/config/types/lang-chain.config.type';

import { LangChainService } from './lang-chain.service';

@Module({
  providers: [
    LangChainService,
    {
      provide: ChatOpenAI,
      useFactory: async (configService: ConfigService) => {
        return new ChatOpenAI({
          ...configService.get<TLangChainConfig>('langChain')?.model,
          configuration: {
            apiKey: configService.get('OPENAI_API_KEY'),
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: OpenAIEmbeddings,
      useFactory: () => {
        return new OpenAIEmbeddings();
      },
    },
    {
      provide: OpenSearchClient,
      useFactory: async (configService: ConfigService) => {
        return new OpenSearchClient({
          node:
            (configService.get('OPENSEARCH_URL') as string) ??
            'http://chat-stack-opensearch:9200',
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [LangChainService, OpenSearchClient],
})
export class LangChainModule {}
