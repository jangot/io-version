import * as fs from 'fs/promises';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
  } from '@nestjs/platform-fastify';
import * as ejs from 'ejs';
import { AppModule } from './app.module';

async function readPartials(templatesFolder: string, partialFolder: string) {
    const files = await fs.readdir(`${templatesFolder}/${partialFolder}`);

    return files
        .filter((name) => /\.hbs$/.test(name))
        .map((name) => name.replace(/.hbs$/, ''))
        .reduce((memo, name) => {
            memo[name] = `${partialFolder}/${name}.hbs`;
            return memo;
        }, {})
}

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
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
