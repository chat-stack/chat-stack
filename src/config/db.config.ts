import { registerAs } from '@nestjs/config';

import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';

import { CustomEntityRepository } from 'src/common/repositories/custom-entity-repository';

const options: MikroOrmModuleSyncOptions = {
  type: 'postgresql',
  host: process.env.POSTGRES_HOST,
  dbName: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  baseDir: process.cwd(),
  entities: ['dist/**/*entity.{ts,js}'],
  entitiesTs: ['src/**/*entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    snapshot: true,
  },
  entityRepository: CustomEntityRepository,
};
export default registerAs('database', () => options);
