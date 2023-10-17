import { Test, TestingModule } from '@nestjs/testing';

import { WebDocController } from './web-doc.controller';
import { WebDocService } from './web-doc.service';

describe('WebDocController', () => {
  let controller: WebDocController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebDocController],
      providers: [WebDocService],
    }).compile();

    controller = module.get<WebDocController>(WebDocController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
