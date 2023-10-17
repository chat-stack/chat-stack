import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AuthModule } from 'src/core/auth/auth.module';

import { ServiceTokenPayloadService } from './service-token-payload.service';

import { ServiceTokenPayload } from './entities/service-token-payload.entity';

@Module({
  imports: [MikroOrmModule.forFeature([ServiceTokenPayload]), AuthModule],
  providers: [ServiceTokenPayloadService],
})
export class ServiceTokenPayloadModule {}
