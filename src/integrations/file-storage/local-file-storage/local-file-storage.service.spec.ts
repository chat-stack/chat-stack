import { Test, TestingModule } from '@nestjs/testing';

import { LocalFileStorageService } from './local-file-storage.service';

describe('LocalFileStorageService', () => {
  let service: LocalFileStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalFileStorageService],
    }).compile();

    service = module.get<LocalFileStorageService>(LocalFileStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
