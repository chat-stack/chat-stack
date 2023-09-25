import { Controller } from '@nestjs/common';

import { EndCustomerService } from './end-customer.service';

@Controller('end-customer')
export class EndCustomerController {
  constructor(private readonly endCustomerService: EndCustomerService) {}

  // @Post()
  // create(@Body() createEndCustomerDto: CreateEndCustomerDto) {
  //   return this.endCustomerService.create(createEndCustomerDto);
  // }

  // @Get()
  // findAll() {
  //   return this.endCustomerService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.endCustomerService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEndCustomerDto: UpdateEndCustomerDto) {
  //   return this.endCustomerService.update(+id, updateEndCustomerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.endCustomerService.remove(+id);
  // }
}
