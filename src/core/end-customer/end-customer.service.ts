import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { EndCustomer } from './entities/end-customer.entity';

@Injectable()
export class EndCustomerService {
  constructor(
    @InjectRepository(EndCustomer)
    private readonly endCustomerRepository: EntityRepository<EndCustomer>,
  ) {}

  async findOneOrFail(id: number): Promise<EndCustomer> {
    return this.endCustomerRepository.findOneOrFail(id, {
      failHandler: () => {
        throw new NotFoundException();
      },
    });
  }
}
