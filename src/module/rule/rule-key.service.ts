import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRuleKeyDto } from './dto/create-rule-key.dto';
import { UpdateRuleKeyDto } from './dto/update-rule-key.dto';
import { RuleKey } from './entities/rule-key.entity';

@Injectable()
export class RuleKeyService {
    constructor(
        @InjectRepository(RuleKey)
        private readonly ruleKey: Repository<RuleKey>,
    ){}

    create(createRuleKeyDto: CreateRuleKeyDto) {
        const key = new RuleKey();
        key.name = createRuleKeyDto.name;
        if (createRuleKeyDto.specificity) {
            key.specificity = createRuleKeyDto.specificity;
        }

        return this.ruleKey.save(key);
    }

    findAll() {
        return this.ruleKey.find({
            order: {
                specificity: 'ASC'
            }
        });
    }

    findOne(id: number) {
        return `This action returns a #${id} rule`;
    }

    async update(id: number, updateRuleKeyDto: UpdateRuleKeyDto) {
        const key = await this.ruleKey.findOneBy({ id });

        key.name = updateRuleKeyDto.name;
        if (updateRuleKeyDto.specificity) {
            key.specificity = updateRuleKeyDto.specificity;
        }

        return this.ruleKey.save(key);
    }

    async remove(id: number) {
        // TODO remove keys in envs
        throw new Error('Clean DB doesn`t implemented');

        const key = await this.ruleKey.findOneBy({ id });

        return this.ruleKey.remove(key);
    }
}
