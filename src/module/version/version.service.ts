import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../application/application.entity';
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
    ) {}
    async create(createVersionDto: CreateVersionDto) {
        const [application] = await Promise.all([
            this.applicationRepo.findOneBy({ id: createVersionDto.applicationId }),
        ]);

        const versionInstance = new Version();
        versionInstance.version = createVersionDto.version;
        versionInstance.application = application;

        return this.versionRepo.save(versionInstance);
    }

    findAll() {
        return this.versionRepo.find({
            relations: {
                application: true,
                deploy: true,
            },
            order: {
                application: {
                     name: "ASC"
               },
            }
        });
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
