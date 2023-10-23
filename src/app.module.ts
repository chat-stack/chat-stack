import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule, BullRootModuleOptions } from '@nestjs/bull';

import { MikroOrmModule, MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import dbConfig from './config/db.config';
import { AuthModule } from './core/auth/auth.module';
import { ServiceTokenPayloadModule } from './core/service-token-payload/service-token-payload.module';
import { ChatBotModule } from './core/chat-bot/chat-bot.module';
import { ChatSessionModule } from './core/chat-session/chat-session.module';
import { ChatHistoryModule } from './core/chat-history/chat-history.module';
import { LangChainModule } from './core/lang-chain/lang-chain.module';
import { ChatModule } from './core/chat/chat.module';
import { EndCustomerModule } from './core/end-customer/end-customer.module';
import { TextDocModule } from './core/text-doc/text-doc.module';
import { RagModule } from './core/rag/rag.module';
import bullConfig from './config/bull.config';
import langChainConfig from './config/lang-chain.config';
import { WebDocModule } from './core/web-doc/web-doc.module';
import { FileDocModule } from './core/file-doc/file-doc.module';
import { FileUploadModule } from './core/file-upload/file-upload.module';
import { FileEntModule } from './core/file-ent/file-ent.module';
import { FileStorageModule } from './integrations/file-storage/file-storage.module';
import validationSchema from './config/validation-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, bullConfig, langChainConfig],
      validationSchema,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule, AuthModule, ServiceTokenPayloadModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get<MikroOrmModuleSyncOptions>('database')!;
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get<BullRootModuleOptions>('bull')!;
      },
    }),
    ServiceTokenPayloadModule,
    ChatModule,
    ChatBotModule,
    ChatSessionModule,
    ChatHistoryModule,
    EndCustomerModule,
    LangChainModule,
    RagModule,
    TextDocModule,
    WebDocModule,
    FileDocModule,
    FileUploadModule,
    FileEntModule,
    FileStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
