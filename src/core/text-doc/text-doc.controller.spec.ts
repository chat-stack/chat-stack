import { Test, TestingModule } from '@nestjs/testing';

import { TextDocController } from './text-doc.controller';
import { TextDocService } from './text-doc.service';

describe('TextDocController', () => {
  let controller: TextDocController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextDocController],
      providers: [TextDocService],
    }).compile();

    controller = module.get<TextDocController>(TextDocController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
