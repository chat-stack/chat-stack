import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { TextDocService } from './text-doc.service';
import { TextDocController } from './text-doc.controller';

import { TextDoc } from './entities/text-doc.entity';

@Module({
  imports: [MikroOrmModule.forFeature([TextDoc])],
  controllers: [TextDocController],
  providers: [TextDocService],
  exports: [TextDocService],
})
export class TextDocModule {}
