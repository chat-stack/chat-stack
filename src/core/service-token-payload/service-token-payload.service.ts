import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';

import { InjectRepository } from '@mikro-orm/nestjs';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

import { Role } from 'src/common/types/role.type';
import { AuthService } from 'src/core/auth/auth.service';
import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';

import { ServiceTokenPayload } from './entities/service-token-payload.entity';
import { IServiceTokenPayloadVerified } from './interfaces/service-token-payload.interface';

@Injectable()
export class ServiceTokenPayloadService implements OnApplicationBootstrap {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
    @InjectRepository(ServiceTokenPayload)
    private readonly serviceTokenPayloadRepository: CustomEntityRepository<ServiceTokenPayload>,
    private readonly authService: AuthService,
  ) {}

  @UseRequestContext()
  async getTokenByRole(role: Role) {
    const oldPayload = await this.serviceTokenPayloadRepository.findOne({
      role,
    });
    let token: string;
    if (!oldPayload) {
      token = this.authService.signServiceToken({
        roles: [role],
      });
      const payload: IServiceTokenPayloadVerified =
        this.authService.verifyToken(token);
      const newPayload = this.serviceTokenPayloadRepository.create({
        role,
        iat: +payload.iat,
        exp: +payload.exp,
      });
      await this.em.persistAndFlush(newPayload);
    } else {
      token = this.authService.signServiceToken({
        roles: [role],
        iat: +oldPayload.iat, // mikro-orm int8 returns string here, need to convert back
      });
    }
    return token;
  }

  async onApplicationBootstrap() {
    const tokens = await Promise.all(
      [Role.ANON, Role.SERVICE].map(async (role) => this.getTokenByRole(role)),
    );
    if (tokens && tokens[0]) {
      // Role.ANON
      Logger.log(`Anon key: ${tokens[0]}`, 'Bootstrap');
    }
    if (tokens && tokens[1]) {
      // Role.SERVICE
      Logger.log(`Service key: ${tokens[1]}`, 'Bootstrap');
    }
  }
}
