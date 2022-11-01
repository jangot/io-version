// import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ApplicationsPageController } from './controller/applications-page.controller';
import { ApplicationModule } from './module/application/application.module';
import { EnvironmentModule } from './module/environment/environment.module';
import { VersionModule } from './module/version/version.module';
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
                    namingStrategy: new SnakeNamingStrategy()
                }
            },
            dataSourceFactory: (options) => createDataSource(options).initialize(),
        }),
        ApplicationModule,
        EnvironmentModule,
        VersionModule,
    ],
    controllers: [ApplicationsPageController],
    providers: [],
})
export class AppModule {}
