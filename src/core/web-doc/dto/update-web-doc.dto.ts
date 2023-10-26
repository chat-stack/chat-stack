import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateWebDocDto } from './create-web-doc.dto';

export class UpdateWebDocDto extends PartialType(
  OmitType(CreateWebDocDto, ['ragId']),
) {}
