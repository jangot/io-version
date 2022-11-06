import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { Environment } from './entities/environment.entity';

@Injectable()
export class EnvironmentService {
    constructor(
        @InjectRepository(Environment)
        private environment: Repository<Environment>
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
                versions: true,
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

    remove(id: number) {
        return `This action removes a #${id} environment`;
    }

}