import { Test, TestingModule } from '@nestjs/testing';

import { S3FileStorageService } from './s3-file-storage.service';

describe('S3FileStorageService', () => {
  let service: S3FileStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3FileStorageService],
    }).compile();

    service = module.get<S3FileStorageService>(S3FileStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
