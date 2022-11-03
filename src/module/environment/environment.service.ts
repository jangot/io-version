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
        const newEnv = new Environment();
        newEnv.name = envDto.name;
        newEnv.description = envDto.description;
        newEnv.orderIndex = envDto.orderIndex;

        return this.environment.save(newEnv);
    }

    async findAll() {
        return this.environment.find({
            relations: {
                versions: true,
            }
        });
    }

    findOne(id: number) {
        return `This action returns a #${id} environment`;
    }
    update(id: number, updateEnvironmentDto: UpdateEnvironmentDto) {
        return `This action updates a #${id} environment`;
    }

    remove(id: number) {
        return `This action removes a #${id} environment`;
    }

}