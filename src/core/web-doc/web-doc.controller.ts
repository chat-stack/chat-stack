import { Controller } from '@nestjs/common';

import { WebDocService } from './web-doc.service';

@Controller('web-doc')
export class WebDocController {
  constructor(private readonly webDocService: WebDocService) {}
}
