import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from './entities/rule.entity';
import { RuleKey } from './entities/rule-key.entity';
import { Environment } from '../environment/entities/environment.entity';
import { RuleKeyService } from './rule-key.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([Environment, Rule, RuleKey])
    ],
    controllers: [RuleController],
    providers: [RuleService, RuleKeyService],
    exports: [RuleService, RuleKeyService]
})
export class RuleModule {}
