import { Inject, Injectable } from '@nestjs/common';

import { Readable } from 'stream';

import { FILE_STORAGE } from './constants';

import {
  IFileStorage,
  IReadFileOptions,
  IWriteFileOptions,
} from './interfaces/file-storage.interface';

@Injectable()
export class FileStorageService implements IFileStorage {
  constructor(
    @Inject(FILE_STORAGE) private readonly fileStorage: IFileStorage,
  ) {}

  async writeFile(options: IWriteFileOptions): Promise<void> {
    return this.fileStorage.writeFile(options);
  }

  async readFile(options: IReadFileOptions): Promise<Readable> {
    return this.fileStorage.readFile(options);
  }
}
