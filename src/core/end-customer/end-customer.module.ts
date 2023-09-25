import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { EndCustomerService } from './end-customer.service';
import { EndCustomerController } from './end-customer.controller';

import { EndCustomer } from './entities/end-customer.entity';

@Module({
  imports: [MikroOrmModule.forFeature([EndCustomer])],
  controllers: [EndCustomerController],
  providers: [EndCustomerService],
  exports: [EndCustomerService],
})
export class EndCustomerModule {}
