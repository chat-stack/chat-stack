import { Test, TestingModule } from '@nestjs/testing';

import { EndCustomerController } from './end-customer.controller';
import { EndCustomerService } from './end-customer.service';

describe('EndCustomerController', () => {
  let controller: EndCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EndCustomerController],
      providers: [EndCustomerService],
    }).compile();

    controller = module.get<EndCustomerController>(EndCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
