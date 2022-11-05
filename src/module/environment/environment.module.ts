import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { EnvironmentController } from './environment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from './entities/environment.entity';
import { Version } from '../version/entities/version.entity';
import { Rule } from '../rule/entities/rule.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Environment, Version, Rule])],
    controllers: [EnvironmentController],
    providers: [EnvironmentService],
    exports: [EnvironmentService],
})
export class EnvironmentModule {}
