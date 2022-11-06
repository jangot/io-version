import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
  } from '@nestjs/platform-fastify';
import * as ejs from 'ejs';
import { RootModule } from './root.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        RootModule,
        new FastifyAdapter()
    );
    app.useGlobalPipes(new ValidationPipe());

    app.useStaticAssets({
        root: join(__dirname, '..', 'public'),
        prefix: '/public/',
    });
    app.setViewEngine({
        engine: { ejs },
        templates: join(__dirname, '..', 'views')
    });

    await app.listen(3000);
    console.log('Server was started on 3000');

}
bootstrap();
