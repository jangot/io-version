import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Repository } from 'typeorm';
import { Environment } from '../environment/entities/environment.entity';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { RuleKey } from './entities/rule-key.entity';
import { Rule } from './entities/rule.entity';

@Injectable()
export class RuleService {
    constructor(
        @InjectRepository(Rule)
        private readonly rule: Repository<Rule>,

        @InjectRepository(RuleKey)
        private readonly key: Repository<RuleKey>,

        @InjectRepository(Environment)
        private readonly env: Repository<Environment>,
    ) {}
    async create(createRuleDto: CreateRuleDto) {
        const [
            env,
            key
        ] = await Promise.all([
            this.env.findOneBy({ id: createRuleDto.environmentId }),
            this.key.findOneBy({ id: createRuleDto.ruleKeyId }),
        ]);

        const rule = new Rule();
        rule.value = createRuleDto.value;
        rule.environment = env;
        rule.key = key;

        return this.rule.save(rule);
    }

    findAll() {
        return this.rule.find({
            relations: {
                key: true
            },
            order: {
                id: 'ASC',
            }
        });
    }

    findOne(id: number) {
        return `This action returns a #${id} rule`;
    }

    async update(id: number, updateRuleDto: UpdateRuleDto) {
        const [
            env,
            key
        ] = await Promise.all([
            this.env.findOneBy({ id: updateRuleDto.environmentId }),
            this.key.findOneBy({ id: updateRuleDto.ruleKeyId }),
        ]);

        const rule = await this.rule.findOneBy({ id });
        rule.value = updateRuleDto.value;
        rule.environment = env;
        rule.key = key;

        return this.rule.save(rule);
    }

    remove(id: number) {
        return `This action removes a #${id} rule`;
    }
}
