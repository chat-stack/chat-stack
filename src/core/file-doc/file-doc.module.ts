import { Module } from '@nestjs/common';

import { FileDocService } from './file-doc.service';
import { FileDocController } from './file-doc.controller';

@Module({
  controllers: [FileDocController],
  providers: [FileDocService],
})
export class FileDocModule {}
