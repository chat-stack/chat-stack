import { Test, TestingModule } from '@nestjs/testing';

import { ServiceTokenPayloadService } from './service-token-payload.service';

describe('ServiceTokenPayloadService', () => {
  let service: ServiceTokenPayloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceTokenPayloadService],
    }).compile();

    service = module.get<ServiceTokenPayloadService>(
      ServiceTokenPayloadService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
