import { Logger, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { LangChainModule } from 'src/core/lang-chain/lang-chain.module';
import { FileStorageModule } from 'src/integrations/file-storage/file-storage.module';

import { FileDocService } from './file-doc.service';
import { FileDocController } from './file-doc.controller';
import { FileDocProcessor } from './file-doc.processor';

import { FileDoc } from './entities/file-doc.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([FileDoc]),
    BullModule.registerQueue({
      name: 'fileDoc',
    }),
    LangChainModule,
    FileStorageModule,
  ],
  controllers: [FileDocController],
  providers: [
    FileDocService,
    FileDocProcessor,
    {
      provide: Logger,
      useFactory: async () => {
        return new Logger(FileDocModule.name);
      },
    },
  ],
  exports: [FileDocService],
})
export class FileDocModule {}
