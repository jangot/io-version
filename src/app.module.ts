import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './application/application.module';
import { EnvironmentModule } from './environment/environment.module';
import { VersionModule } from './version/version.module';
import { create as createDataSource } from './utils/factories/dataSource';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                return {
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: '123',
                    database: 'io_versions',
                    entities: [],
                    synchronize: true,
                    autoLoadEntities: true,
                }
            },
            dataSourceFactory: (options) => createDataSource(options).initialize(),
        }),
        ApplicationModule,
        EnvironmentModule,
        VersionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
