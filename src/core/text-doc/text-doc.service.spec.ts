import { Test, TestingModule } from '@nestjs/testing';

import { TextDocService } from './text-doc.service';

describe('TextDocService', () => {
  let service: TextDocService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextDocService],
    }).compile();

    service = module.get<TextDocService>(TextDocService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
