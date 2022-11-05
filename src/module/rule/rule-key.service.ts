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

        return this.ruleKey.save(key);
    }

    findAll() {
        return this.ruleKey.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} rule`;
    }

    update(id: number, updateRuleKeyDto: UpdateRuleKeyDto) {
        return `This action updates a #${id} rule`;
    }

    remove(id: number) {
        return `This action removes a #${id} rule`;
    }
}
