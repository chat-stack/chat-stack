import { Test, TestingModule } from '@nestjs/testing';

import { FileDocService } from './file-doc.service';

describe('FileDocService', () => {
  let service: FileDocService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileDocService],
    }).compile();

    service = module.get<FileDocService>(FileDocService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
