import { Test, TestingModule } from '@nestjs/testing';
import { WebDocService } from './web-doc.service';

describe('WebDocService', () => {
  let service: WebDocService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebDocService],
    }).compile();

    service = module.get<WebDocService>(WebDocService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
