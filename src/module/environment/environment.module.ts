import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { EnvironmentController } from './environment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from './entities/environment.entity';
import { Rule } from '../rule/entities/rule.entity';
import { Deploy } from '../deploy/entities/deploy.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Environment, Rule, Deploy])],
    controllers: [EnvironmentController],
    providers: [EnvironmentService],
    exports: [EnvironmentService],
})
export class EnvironmentModule {}
