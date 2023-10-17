import { Test, TestingModule } from '@nestjs/testing';

import { ChatHistoryService } from './chat-history.service';

describe('ChatHistoryService', () => {
  let service: ChatHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatHistoryService],
    }).compile();

    service = module.get<ChatHistoryService>(ChatHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
