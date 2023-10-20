import { Module } from '@nestjs/common';

import { FileStorageModule } from 'src/integrations/file-storage/file-storage.module';
import { FileEntModule } from 'src/core/file-ent/file-ent.module';

import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';

@Module({
  imports: [FileStorageModule, FileEntModule],
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
