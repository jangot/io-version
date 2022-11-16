import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Environment } from '../environment/entities/environment.entity';
import { Version } from '../version/entities/version.entity';
import { CreateDeployDto } from './dto/create-deploy.dto';
import { UpdateDeployDto } from './dto/update-deploy.dto';
import { Deploy } from './entities/deploy.entity';

@Injectable()
export class DeployService {
    constructor(
        @InjectRepository(Deploy)
        private readonly deployRepo: Repository<Deploy>,

        @InjectRepository(Version)
        private readonly versionRepo: Repository<Version>,

        @InjectRepository(Environment)
        private readonly environmentRepo: Repository<Environment>,
    ){}

    async create(createDeployDto: CreateDeployDto) {
        const [
            version,
            environment
        ] = await Promise.all([
            this.versionRepo.findOneBy({ id: createDeployDto.versoinId }),
            this.environmentRepo.findOneBy({ id: createDeployDto.environmentId }),
        ]);
        const deploy = new Deploy();
        deploy.environment = environment;
        deploy.version = version;

        return this.deployRepo.save(deploy);
    }

    findAll() {
        return this.deployRepo.find({
            relations: {
                version: true,
                environment: true,
            },
            order: {
                versionId: 'ASC',
                environmentId: 'ASC',
            }
        });
    }

    findByAppicationId(id: number) {
        return this.deployRepo.find({
            where: {
                version: {
                    applicationId: id
                }
            },
            relations: {
                version: true,
                environment: true,
            },
            order: {
                versionId: 'ASC',
                environmentId: 'ASC',
            }
        });
    }

    findOne(id: number) {
        return this.deployRepo.findOne({
            where: {
                id
            },
            relations: {
                version: true,
                environment: true,
            }
        });
    }

    async update(id: number, updateDeployDto: UpdateDeployDto) {
        const [
            version,
            environment
        ] = await Promise.all([
            this.versionRepo.findOneBy({ id: updateDeployDto.environmentId }),
            this.environmentRepo.findOneBy({ id: updateDeployDto.environmentId }),
        ]);
        const deploy = await this.deployRepo.findOneBy({ id });
        deploy.environment = environment;
        deploy.version = version;

        return this.deployRepo.save(deploy);
    }

    async remove(id: number) {
        const deploy = await this.deployRepo.findOneBy({ id });

        return this.deployRepo.remove(deploy);
    }
}
