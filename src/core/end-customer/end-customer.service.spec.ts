import { Test, TestingModule } from '@nestjs/testing';

import { EndCustomerService } from './end-customer.service';

describe('EndCustomerService', () => {
  let service: EndCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndCustomerService],
    }).compile();

    service = module.get<EndCustomerService>(EndCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
