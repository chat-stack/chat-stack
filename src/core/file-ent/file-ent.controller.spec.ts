import { Test, TestingModule } from '@nestjs/testing';

import { FileEntService } from './file-ent.service';
import { FileEntController } from './file-ent.controller';

describe('FileEntController', () => {
  let controller: FileEntController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileEntController],
      providers: [FileEntService],
    }).compile();

    controller = module.get<FileEntController>(FileEntController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
