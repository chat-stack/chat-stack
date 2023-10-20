import { PartialType } from '@nestjs/mapped-types';

import { CreateFileEntDto } from './create-file-ent.dto';

export class UpdateFileDto extends PartialType(CreateFileEntDto) {}
