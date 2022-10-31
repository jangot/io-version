import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Version } from './entities/version.entity';
import { Application } from 'src/application/application.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Version, Application]),
  ],
  controllers: [VersionController],
  providers: [VersionService]
})
export class VersionModule {}
