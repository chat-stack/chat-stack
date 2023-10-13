export interface FileStorage {
  writeFile(
    directoryPath: string,
    filename: string,
    fileContent: Buffer,
  ): Promise<void>;
  readFile(directoryPath: string, filename: string): Promise<Buffer>;
}
