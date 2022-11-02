import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Application } from '../application/application.entity';
import { Environment } from '../environment/entities/environment.entity';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { Version } from './entities/version.entity';

@Injectable()
export class VersionService {
    private readonly logger = new Logger(VersionService.name);

    constructor(
        @InjectRepository(Version)
        private readonly versionRepo: Repository<Version>,

        @InjectRepository(Application)
        private readonly applicationRepo: Repository<Application>,

        @InjectRepository(Environment)
        private readonly environmentRepo: Repository<Environment>,

        private dataSource: DataSource
    ) {}
    async create1(createVersionDto: CreateVersionDto) {
        const [application, enviroment] = await Promise.all([
            this.applicationRepo.findOneBy({ id: createVersionDto.applicationId }),
            this.environmentRepo.findOneBy({ id: createVersionDto.environmentId })
        ]);

        const versionInstance = new Version();
        versionInstance.version = createVersionDto.version;
        versionInstance.application = application;
        versionInstance.environment = enviroment;

        return this.versionRepo.save(versionInstance);
    }

    findAll() {
        return `This action returns all version`;
    }

    findOne(id: number) {
        return `This action returns a #${id} version`;
    }

    update(id: number, updateVersionDto: UpdateVersionDto) {
        return `This action updates a #${id} version`;
    }

    remove(id: number) {
        return `This action removes a #${id} version`;
    }
}
