import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateFileDocDto } from './create-file-doc.dto';

export class UpdateFileDocDto extends PartialType(
  OmitType(CreateFileDocDto, ['ragId']),
) {}
