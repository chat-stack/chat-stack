import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';

import {
  IFileStorage,
  IReadFileOptions,
  IWriteFileOptions,
} from 'src/integrations/file-storage/interfaces/file-storage.interface';

@Injectable()
export class LocalFileStorageService implements IFileStorage {
  async mkdir(path: string) {
    if (fs.existsSync(path)) {
      return;
    }

    return fs.mkdir(path, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }

  async writeFile({
    directoryPath,
    filename,
    fileContent,
  }: IWriteFileOptions): Promise<void> {
    const filePath = path.join(`uploads/`, directoryPath, filename);
    const folderPath = path.dirname(filePath);

    await this.mkdir(folderPath);

    return fs.writeFile(filePath, fileContent, (err) => {
      if (err) throw err;
    });
  }

  async readFile({
    directoryPath,
    filename,
  }: IReadFileOptions): Promise<Readable> {
    const filePath = path.join(`uploads/`, directoryPath, filename);
    return fs.createReadStream(filePath);
  }
}
