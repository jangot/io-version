// import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './module/application/application.module';
import { EnvironmentModule } from './module/environment/environment.module';
import { VersionModule } from './module/version/version.module';
import { create as createDataSource } from './utils/factories/dataSource';
// import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
    imports: [
        // ServeStaticModule.forRoot({
        //     rootPath: join(__dirname, '..', 'client'),
        //   }),
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
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
