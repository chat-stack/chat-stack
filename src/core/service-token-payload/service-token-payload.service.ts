import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';

import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, MikroORM, UseRequestContext } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

import { Role } from 'src/core/role/types/role.type';
import { AuthService } from 'src/core/auth/auth.service';

import { ServiceTokenPayload } from './entities/service-token-payload.entity';
import { IServiceTokenPayloadVerified } from './types/service-token-payload.interface';

@Injectable()
export class ServiceTokenPayloadService implements OnApplicationBootstrap {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
    @InjectRepository(ServiceTokenPayload)
    private readonly serviceTokenPayloadRepository: EntityRepository<ServiceTokenPayload>,
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
        role,
      });
      const payload: IServiceTokenPayloadVerified =
        this.authService.verifyToken(token);
      const newPayload = this.serviceTokenPayloadRepository.create({
        createdAt: new Date(),
        updatedAt: new Date(),
        role: payload.role,
        iat: parseInt(payload.iat, 10),
        exp: parseInt(payload.exp, 10),
      });
      await this.em.persistAndFlush(newPayload);
    } else {
      token = this.authService.signServiceToken({
        role,
        iat: parseInt(oldPayload.iat.toString(), 10), // mikro-orm int8 returns string here, need to convert back
      });
    }
    return token;
  }

  async onApplicationBootstrap() {
    const tokens = await Promise.all(
      [Role.ANON, Role.SERVICE].map(async (role) => this.getTokenByRole(role)),
    );
    if (tokens && tokens[0]) {
      Logger.log(`Anon key: ${tokens[0]}`, 'Bootstrap');
    }
    if (tokens && tokens[1]) {
      Logger.log(`Service key: ${tokens[1]}`, 'Bootstrap');
    }
  }
}
