import { registerAs } from '@nestjs/config';

import { TLangChainConfig } from './types/lang-chain.config.type';

export default registerAs(
  'langChain',
  (): TLangChainConfig => ({
    model: {
      modelName: 'gpt-3.5-turbo-16k-0613',
      temperature: 0,
      verbose: true,
    },
    bufferWindowMemoryInput: {
      memoryKey: 'chat_history',
      returnMessages: true,
      k: 50,
    },
  }),
);
