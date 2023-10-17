import { Readable } from 'stream';

export interface IWriteFileOptions {
  directoryPath?: string;
  filename: string;
  fileContent: Buffer | Uint8Array | string;
  mimeType: string | undefined;
}

export interface IReadFileOptions {
  directoryPath?: string;
  filename: string;
}

export interface IFileStorage {
  writeFile(options: IWriteFileOptions): Promise<void>;
  readFile(options: IReadFileOptions): Promise<Readable>;
}
