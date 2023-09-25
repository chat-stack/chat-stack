import {
  AzureOpenAIInput,
  OpenAIChatInput,
} from 'langchain/chat_models/openai';
import { BaseChatModelParams } from 'langchain/chat_models/base';
import { BufferWindowMemoryInput } from 'langchain/memory';

type TChatOpenAIOptions = Partial<OpenAIChatInput> &
  Partial<AzureOpenAIInput> &
  BaseChatModelParams;

export type TLangChainConfig = {
  model: TChatOpenAIOptions;
  bufferWindowMemoryInput: BufferWindowMemoryInput;
};
