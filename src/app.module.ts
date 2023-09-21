import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MikroOrmModule, MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import dbConfig from './config/db.config';
import { AuthModule } from './core/auth/auth.module';
import { ServiceTokenPayloadModule } from './core/service-token-payload/service-token-payload.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
