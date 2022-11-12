import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rule } from '../rule/entities/rule.entity';
import { Version } from '../version/entities/version.entity';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { Environment } from './entities/environment.entity';

@Injectable()
export class EnvironmentService {
    constructor(
        @InjectRepository(Environment)
        private environment: Repository<Environment>,

        @InjectRepository(Rule)
        private rule: Repository<Rule>,
    ) {}
    async create(envDto: CreateEnvironmentDto): Promise<Environment> {
        const env = new Environment();
        env.name = envDto.name;
        env.description = envDto.description;
        env.orderIndex = envDto.orderIndex;

        return this.environment.save(env);
    }

    async findAll() {
        return this.environment.find({
            relations: {
                rules: true
            },
            order: {
                name: 'ASC',
                rules: {
                    keyId: 'ASC'
                }
            }
        });
    }

    findOne(id: number) {
        return `This action returns a #${id} environment`;
    }
    async update(id: number, envDto: UpdateEnvironmentDto) {
        const env = await this.environment.findOneBy({ id });
        env.name = envDto.name;
        env.description = envDto.description;
        env.orderIndex = envDto.orderIndex;

        return this.environment.save(env);
    }

    async remove(id: number) {
        const env = await this.environment.findOne({
            where: { id },
            relations: {
                rules: true,
            }
        });

        await Promise.all([
            this.rule.remove(env.rules),
        ]);


        return this.environment.remove(env);
    }

}