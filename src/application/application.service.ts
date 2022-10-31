import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Application } from './application.entity';

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>,
    ) {}

    findAll(): Promise<Application[]> {
        return this.applicationRepository.find();
    }

    findOne(id: number): Promise<Application> {
        return this.applicationRepository.findOneBy({ id });
    }

    async remove(id: string): Promise<void> {
        await this.applicationRepository.delete(id);
    }
}
