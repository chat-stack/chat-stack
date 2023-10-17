import { PartialType } from '@nestjs/mapped-types';

import { CreateServiceTokenPayloadDto } from './create-service-token-payload.dto';

export class UpdateServiceTokenPayloadDto extends PartialType(
  CreateServiceTokenPayloadDto,
) {}
