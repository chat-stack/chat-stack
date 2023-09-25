import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ChatOpenAI } from 'langchain/chat_models/openai';

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
  ],
  exports: [LangChainService],
})
export class LangChainModule {}
