import { Controller } from '@nestjs/common';

import { TextDocService } from './text-doc.service';

@Controller('text-doc')
export class TextDocController {
  constructor(private readonly textDocService: TextDocService) {}
}
