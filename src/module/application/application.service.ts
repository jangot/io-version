import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Repository } from 'typeorm';

import { Application } from './application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>,
    ) {}

    create(createApplicationDto: CreateApplicationDto): Promise<Application> {
        const app = new Application();
        app.name = createApplicationDto.name;
        app.isActive = createApplicationDto.isActive;

        return this.applicationRepository.save(app);
    }

    async update(id: number, updateApplicationDto: UpdateApplicationDto) {
        const app = await this.applicationRepository.findOneBy({ id });

        app.name = updateApplicationDto.name;
        app.isActive = updateApplicationDto.isActive;

        return this.applicationRepository.save(app);
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

    async remove(id: number): Promise<void> {
        this.applicationRepository.delete(id);
    }
}
