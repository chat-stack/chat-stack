import { Test, TestingModule } from '@nestjs/testing';

import { FileEntService } from './file-ent.service';

describe('FileEntService', () => {
  let service: FileEntService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileEntService],
    }).compile();

    service = module.get<FileEntService>(FileEntService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
