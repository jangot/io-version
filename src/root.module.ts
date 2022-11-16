import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ApplicationsPageController } from './controller/applications-page.controller';
import { EnvironmentsPageController } from './controller/environments-page.controller';
import { ApplicationModule } from './module/application/application.module';
import { EnvironmentModule } from './module/environment/environment.module';
import { RuleModule } from './module/rule/rule.module';
import { VersionModule } from './module/version/version.module';
import { create as createDataSource } from './utils/factories/dataSource';
import { DeployModule } from './module/deploy/deploy.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                return {
                    logging: true,
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: '123',
                    database: 'io_versions_2',
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
        RuleModule,
        DeployModule,
    ],
    controllers: [ApplicationsPageController, EnvironmentsPageController],
    providers: [],
})
export class RootModule {}
