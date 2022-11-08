import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { Application } from './application.entity';
import { ApplicationController } from './application.controller';
import { Version } from '../version/entities/version.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Application, Version])],
    providers: [ApplicationService],
    controllers: [ApplicationController],
    exports: [ApplicationService]
})
export class ApplicationModule {}
