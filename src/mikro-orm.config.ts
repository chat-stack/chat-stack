import { ConfigModule } from '@nestjs/config';

import dbConfig from './config/db.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfig],
});
export default dbConfig();
