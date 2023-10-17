import { Test, TestingModule } from '@nestjs/testing';

import { FileDocController } from './file-doc.controller';
import { FileDocService } from './file-doc.service';

describe('FileDocController', () => {
  let controller: FileDocController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileDocController],
      providers: [FileDocService],
    }).compile();

    controller = module.get<FileDocController>(FileDocController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
