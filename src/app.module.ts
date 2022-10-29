import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './module/application/application.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '123',
            database: 'io_versions',
            entities: [],
            synchronize: true,
            autoLoadEntities: true,
        }),
        ApplicationModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
