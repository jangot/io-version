import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Version } from './entities/version.entity';
import { Application } from '../application/application.entity';
import { Environment } from '../environment/entities/environment.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Version, Application, Environment]),
    ],
    controllers: [VersionController],
    providers: [VersionService],
    exports: [VersionService],
})
export class VersionModule {}
