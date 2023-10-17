import { BullRootModuleOptions } from '@nestjs/bull';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'bull',
  (): BullRootModuleOptions => ({
    redis: {
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT!,
    },
  }),
);
