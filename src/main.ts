import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as fs from 'fs';

import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { createLogger, format, LoggerOptions, transports } from 'winston';

import { AppModule } from './app.module';

import { TrimPipe } from './common/pipes/trim.pipe';

async function bootstrap() {
  const sharedOptions: LoggerOptions = {
    level: 'debug',
    format: format.combine(
      format.timestamp(),
      format.ms(),
      nestWinstonModuleUtilities.format.nestLike(
        `chat-stack-server ${process.env.NODE_ENV}`,
        {
          colors: true,
          prettyPrint: true,
        },
      ),
    ),
    silent: false,
    handleExceptions: true,
    handleRejections: true,
  };
  let instance = createLogger({
    ...sharedOptions,
    transports: [
      new transports.Console(sharedOptions),
      new transports.File({
        ...sharedOptions,
        filename: 'nestjs.log',
        format: format.combine(
          format.timestamp(),
          format.ms(),
          nestWinstonModuleUtilities.format.nestLike(
            `chat-stack-server ${process.env.NODE_ENV}`,
            {
              colors: false,
              prettyPrint: true,
            },
          ),
        ),
      }),
    ],
    exitOnError: false,
  });
  if (process.env.NODE_ENV !== 'local') {
    instance = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.ms(), format.json()),
      transports: [
        new transports.Console({
          ...sharedOptions,
          format: format.combine(
            format.timestamp(),
            format.ms(),
            nestWinstonModuleUtilities.format.nestLike(
              `chat-stack-server ${process.env.NODE_ENV}`,
              {
                colors: false,
                prettyPrint: true,
              },
            ),
          ),
        }),
      ],
    });
  }
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });
  // In local dev this allows readme doc try-it playground
  if (process.env.NODE_ENV === 'local') {
    app.enableCors();
  }
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
      enableCircularCheck: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('ChatStack API Docs')
    .setDescription('ChatStack API Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  if (process.env.NODE_ENV === 'local') {
    fs.writeFileSync(
      './swagger-spec.json',
      JSON.stringify({
        ...document,
        servers: [{ url: 'http://localhost:5001' }],
        'x-readme': {
          'explorer-enabled': true,
          'proxy-enabled': false,
          'samples-languages': ['shell', 'python', 'javascript', 'node'],
        },
      }),
    );
  }
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
