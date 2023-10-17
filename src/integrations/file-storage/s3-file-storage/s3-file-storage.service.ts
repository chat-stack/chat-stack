import { BadRequestException, Injectable } from '@nestjs/common';

import { Readable } from 'stream';

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import {
  IFileStorage,
  IReadFileOptions,
  IWriteFileOptions,
} from 'src/integrations/file-storage/interfaces/file-storage.interface';

import { DEFAULT_DIRECTORY_PATH } from 'src/integrations/file-storage/constants';

@Injectable()
export class S3FileStorageService implements IFileStorage {
  private bucketName = 'examplebucket';

  constructor(private readonly s3Client: S3Client) {}

  async writeFile({
    directoryPath = DEFAULT_DIRECTORY_PATH,
    filename,
    fileContent,
    mimeType,
  }: IWriteFileOptions): Promise<void> {
    const command = new PutObjectCommand({
      Body: fileContent,
      ContentType: mimeType,
      Bucket: this.bucketName,
      Key: `${directoryPath}/${filename}`,
      ServerSideEncryption: 'AES256',
    });
    await this.s3Client.send(command);
  }

  async readFile({
    directoryPath = DEFAULT_DIRECTORY_PATH,
    filename,
  }: IReadFileOptions): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: `${directoryPath}/${filename}`,
    });
    const response = await this.s3Client.send(command);
    if (!response || !response.Body || !(response.Body instanceof Readable)) {
      throw new BadRequestException('Failed to get file stream');
    }
    const readStream = Readable.from(response.Body);
    return readStream;
  }
}
