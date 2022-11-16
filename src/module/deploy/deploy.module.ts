import { Module } from '@nestjs/common';
import { DeployService } from './deploy.service';
import { DeployController } from './deploy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deploy } from './entities/deploy.entity';
import { Version } from '../version/entities/version.entity';
import { Environment } from '../environment/entities/environment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Deploy, Version, Environment])
    ],
    controllers: [DeployController],
    providers: [DeployService],
    exports: [DeployService],
})
export class DeployModule {}
