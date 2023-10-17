import { Injectable } from '@nestjs/common';

import { FileStorageService } from 'src/integrations/file-storage/file-storage.service';
import { FileService } from 'src/core/file/file.service';
import { DEFAULT_DIRECTORY_PATH } from 'src/integrations/file-storage/constants';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly fileService: FileService,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    await this.fileStorageService.writeFile({
      directoryPath: DEFAULT_DIRECTORY_PATH,
      filename: file.originalname,
      fileContent: file.buffer,
      mimeType: file.mimetype,
    });
    const fileEnt = await this.fileService.create({
      filename: file.fieldname,
      mimeType: file.mimetype,
    });
    return fileEnt;
  }
}
