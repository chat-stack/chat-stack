import { Test, TestingModule } from '@nestjs/testing';

import { ChatSessionService } from './chat-session.service';

describe('ChatSessionService', () => {
  let service: ChatSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatSessionService],
    }).compile();

    service = module.get<ChatSessionService>(ChatSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
