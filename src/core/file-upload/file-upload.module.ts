import { Module } from '@nestjs/common';

import { FileStorageModule } from 'src/integrations/file-storage/file-storage.module';
import { FileModule } from 'src/core/file/file.module';

import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';

@Module({
  imports: [FileStorageModule, FileModule],
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
