import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { FileStorageService } from 'src/integrations/file-storage/file-storage.service';
import { FileService } from 'src/core/file/file.service';
import { DEFAULT_DIRECTORY_PATH } from 'src/integrations/file-storage/constants';
import DeepLog from 'src/common/util/deep-log';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly fileService: FileService,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    const fileEnt = await this.fileService.create({
      filename: file.fieldname,
      mimeType: file.mimetype,
    });
    if (!fileEnt) {
      throw new InternalServerErrorException('Failed to upload file');
    }
    await this.fileStorageService.writeFile({
      directoryPath: DEFAULT_DIRECTORY_PATH,
      filename: `${file.originalname.split('.')[0]}-${fileEnt.uuid}.${
        file.originalname.split('.')[1]
      }`,
      fileContent: file.buffer,
      mimeType: file.mimetype,
    });
    DeepLog('James');
    return fileEnt;
  }
}
