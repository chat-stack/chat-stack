import { PartialType } from '@nestjs/mapped-types';

import { CreateEndCustomerDto } from './create-end-customer.dto';

export class UpdateEndCustomerDto extends PartialType(CreateEndCustomerDto) {}
