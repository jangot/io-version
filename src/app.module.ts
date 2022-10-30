import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './application/application.module';
import { EnvironmentModule } from './environment/environment.module';

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
        EnvironmentModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
