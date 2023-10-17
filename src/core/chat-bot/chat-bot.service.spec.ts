import { Test, TestingModule } from '@nestjs/testing';

import { ChatBotService } from './chat-bot.service';

describe('ChatBotService', () => {
  let service: ChatBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatBotService],
    }).compile();

    service = module.get<ChatBotService>(ChatBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
