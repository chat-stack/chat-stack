import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@mikro-orm/nestjs';

import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';

import { EndCustomer } from './entities/end-customer.entity';

@Injectable()
export class EndCustomerService {
  constructor(
    @InjectRepository(EndCustomer)
    private readonly endCustomerRepository: CustomEntityRepository<EndCustomer>,
  ) {}

  async findOneOrFail(id: number): Promise<EndCustomer> {
    return this.endCustomerRepository.findOneOrFail(id, {
      failHandler: () => {
        throw new NotFoundException();
      },
    });
  }
}
