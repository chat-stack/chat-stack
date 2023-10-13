import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FileStorageService } from './file-storage.service';

import { LocalFileStorageService } from './local-file-storage/local-file-storage.service';
import { S3FileStorageService } from './s3-file-storage/s3-file-storage.service';

@Module({
  providers: [
    FileStorageService,
    {
      provide: 'FILE_STORAGE_SERVICE',
      useFactory: async (configService: ConfigService) => {
        const storageType = configService.get('FILE_STORAGE_TYPE');
        if (storageType === 'local') {
          return new LocalFileStorageService();
        } else if (storageType === 's3') {
          return new S3FileStorageService();
        } else {
          throw new Error(`Invalid file storage type: ${storageType}`);
        }
      },
      inject: [ConfigService],
    },
  ],
})
export class FileStorageModule {}
