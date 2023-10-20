import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { v4 } from 'uuid';

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
    const filenameParts = file.originalname.split('.');
    const fileExtension = filenameParts.pop();
    const filename = `${filenameParts.join('.')}-${v4()}.${fileExtension}`;
    const fileEnt = await this.fileService.createPersisted({
      filename,
      mimeType: file.mimetype,
    });
    if (!fileEnt) {
      throw new InternalServerErrorException('Failed to upload file');
    }
    await this.fileStorageService.writeFile({
      directoryPath: DEFAULT_DIRECTORY_PATH,
      filename,
      fileContent: file.buffer,
      mimeType: file.mimetype,
    });
    return fileEnt;
  }
}
