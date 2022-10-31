import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/application/application.entity';
import { Repository } from 'typeorm';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { Version } from './entities/version.entity';

@Injectable()
export class VersionService {
    constructor(
        @InjectRepository(Version)
        private readonly versionRepo: Repository<Version>,

        @InjectRepository(Application)
        private readonly applicationRepo: Repository<Application>,
    ) {}
    async create(createVersionDto: CreateVersionDto) {
        const ver = new Version();

        ver.version = createVersionDto.version;

        await this.versionRepo.save(ver);

        const app = await this.applicationRepo.findOne({
            relations: {
                versions: true,
            },
            where: {
                id: createVersionDto.applicationId,
            }
         });

         app.versions.push(ver);

         await this.applicationRepo.save(app);

         return ver;
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
