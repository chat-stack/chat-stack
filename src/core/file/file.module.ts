import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { FileService } from './file.service';
import { FileController } from './file.controller';

import { File } from './entities/file.entity';

@Module({
  imports: [MikroOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
