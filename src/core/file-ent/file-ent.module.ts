import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { FileEntService } from './file-ent.service';
import { FileEntController } from './file-ent.controller';

import { FileEnt } from './entities/file-ent.entity';

@Module({
  imports: [MikroOrmModule.forFeature([FileEnt])],
  controllers: [FileEntController],
  providers: [FileEntService],
  exports: [FileEntService],
})
export class FileEntModule {}
