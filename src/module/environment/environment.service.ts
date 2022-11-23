import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deploy } from '../deploy/entities/deploy.entity';
import { Rule } from '../rule/entities/rule.entity';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { Environment } from './entities/environment.entity';

@Injectable()
export class EnvironmentService {
    constructor(
        @InjectRepository(Environment)
        private environmentRepo: Repository<Environment>,

        @InjectRepository(Rule)
        private ruleRepo: Repository<Rule>,

        @InjectRepository(Deploy)
        private readonly deployRepo: Repository<Deploy>,
    ) {}
    async create(envDto: CreateEnvironmentDto): Promise<Environment> {
        const env = new Environment();
        env.name = envDto.name;
        env.description = envDto.description;
        env.orderIndex = envDto.orderIndex;

        return this.environmentRepo.save(env);
    }

    async findAll() {
        return this.environmentRepo.find({
            relations: {
                rules: true,
                deploy: true
            },
            order: {
                orderIndex: 'ASC',
                rules: {
                    keyId: 'ASC',
                },
                deploy: {
                    createdAt: 'DESC'
                }
            }
        });
    }

    findOne(id: number) {
        return `This action returns a #${id} environment`;
    }
    async update(id: number, envDto: UpdateEnvironmentDto) {
        const env = await this.environmentRepo.findOneBy({ id });
        env.name = envDto.name;
        env.description = envDto.description;
        env.orderIndex = envDto.orderIndex;

        return this.environmentRepo.save(env);
    }

    async remove(id: number) {
        const env = await this.environmentRepo.findOne({
            where: { id },
            relations: {
                rules: true,
                deploy: true,
            }
        });

        await Promise.all([
            this.ruleRepo.remove(env.rules),
            this.deployRepo.remove(env.deploy),
        ]);


        return this.environmentRepo.remove(env);
    }

}