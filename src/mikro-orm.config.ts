import { ConfigModule } from '@nestjs/config';

import dbConfig from './config/db.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfig],
  envFilePath: [
    process.env.NODE_ENV === 'local' ? '.env' : `${process.env.NODE_ENV}.env`,
  ],
});
export default dbConfig();
