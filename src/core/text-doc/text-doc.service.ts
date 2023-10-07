import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@mikro-orm/nestjs';

import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';

import { TextDoc } from './entities/text-doc.entity';

@Injectable()
export class TextDocService {
  constructor(
    @InjectRepository(TextDoc)
    private readonly textDocRepository: CustomEntityRepository<TextDoc>,
  ) {}
}
