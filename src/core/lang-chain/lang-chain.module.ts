import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Client as OpenSearchClient } from '@opensearch-project/opensearch';

import { TLangChainConfig } from 'src/config/types/lang-chain.config.type';
import DeepLog from 'src/common/util/deep-log';

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
        DeepLog(configService.get('OPENSEARCH_URL'));
        return new OpenSearchClient({
          // nodes: [
          //   // (configService.get('OPENSEARCH_URL') as string) ??
          //   //   'http://metadata-gpt-opensearch:9200',
          //   'http://localhost:9200',
          // ],
          node: 'http://metadata-gpt-opensearch:9200',
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [LangChainService, OpenAIEmbeddings, OpenSearchClient],
})
export class LangChainModule {}
