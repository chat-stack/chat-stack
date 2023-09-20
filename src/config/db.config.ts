import { registerAs } from '@nestjs/config';

import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const options: MikroOrmModuleSyncOptions = {
  type: 'postgresql',
  host: process.env.POSTGRES_HOST,
  dbName: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  baseDir: process.cwd(),
  metadataProvider: TsMorphMetadataProvider,
  entities: ['dist/**/*entity.{ts,js}'],
  entitiesTs: ['src/**/*entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    snapshot: true,
  },
};
export default registerAs('database', () => options);
