import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { S3Client } from '@aws-sdk/client-s3';

import { FileStorageService } from './file-storage.service';
import { FILE_STORAGE } from './constants';

import { LocalFileStorageService } from './local-file-storage/local-file-storage.service';
import { S3FileStorageService } from './s3-file-storage/s3-file-storage.service';

@Module({
  providers: [
    FileStorageService,
    {
      provide: S3Client,
      useFactory: () => {
        return new S3Client('us-west-1');
      },
    },
    {
      provide: FILE_STORAGE,
      useFactory: async (configService: ConfigService, s3Client: S3Client) => {
        const storageType = configService.get('FILE_STORAGE_TYPE');
        if (storageType === 'local') {
          return new LocalFileStorageService();
        } else if (storageType === 's3') {
          return new S3FileStorageService(s3Client);
        } else {
          throw new Error(`Invalid file storage type: ${storageType}`);
        }
      },
      inject: [ConfigService, S3Client],
    },
  ],
  exports: [FileStorageService],
})
export class FileStorageModule {}
