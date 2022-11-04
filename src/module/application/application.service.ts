import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Application } from './application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>,
    ) {}

    create(createApplicationDto: CreateApplicationDto): Promise<Application> {
        const newApp = new Application();
        newApp.name = createApplicationDto.name;
        newApp.isActive = createApplicationDto.isActive;

        return this.applicationRepository.save(newApp);
    }

    findAll(): Promise<Application[]> {
        return this.applicationRepository.find({
            relations: {
                versions: true,
            },
            order: {
                name: 'ASC'
            }
        });
    }

    findOne(id: number): Promise<Application> {
        return this.applicationRepository.findOne({
            where: { id },
            relations: ['versions']
        });
    }

    async remove(id: string): Promise<void> {
        await this.applicationRepository.delete(id);
    }
}
