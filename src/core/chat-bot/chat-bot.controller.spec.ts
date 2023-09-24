import { Test, TestingModule } from '@nestjs/testing';

import { ChatBotController } from './chat-bot.controller';
import { ChatBotService } from './chat-bot.service';

describe('ChatBotController', () => {
  let controller: ChatBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatBotController],
      providers: [ChatBotService],
    }).compile();

    controller = module.get<ChatBotController>(ChatBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
