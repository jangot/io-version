import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Application } from '../application/application.entity';
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

        private dataSource: DataSource
    ) {}
    async create(createVersionDto: CreateVersionDto) {
        const ver = new Version();
        ver.version = createVersionDto.version;

        const app = await this.applicationRepo.findOne({
            relations: {
                versions: true,
            },
            where: {
                id: createVersionDto.applicationId,
            }
         });

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(ver);
            app.versions.push(ver);
            await queryRunner.manager.save(app);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        };

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
