import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateTextDocDto } from './create-text-doc.dto';

export class UpdateTextDocDto extends PartialType(
  OmitType(CreateTextDocDto, ['ragId']),
) {}
