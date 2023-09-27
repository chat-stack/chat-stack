import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as fs from 'fs';

import { AppModule } from './app.module';

import { TrimPipe } from './common/pipes/trim.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalPipes(new TrimPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('MetaGPTBot API Docs')
    .setDescription('MetaGPTBot API Docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  if (process.env.NODE_ENV === 'local') {
    fs.writeFileSync(
      './swagger-spec.json',
      JSON.stringify({
        ...document,
        servers: [{ url: 'http://localhost:5001' }],
      }),
    );
  }
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
