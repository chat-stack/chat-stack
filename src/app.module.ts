import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule, AuthModule, ServiceTokenPayloadModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get<MikroOrmModuleSyncOptions>('database')!;
      },
    }),
    ServiceTokenPayloadModule,
    ChatModule,
    ChatBotModule,
    ChatSessionModule,
    ChatHistoryModule,
    EndCustomerModule,
    LangChainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
