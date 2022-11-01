import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { Application } from './application.entity';
import { ApplicationController } from './application.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Application])],
    providers: [ApplicationService],
    controllers: [ApplicationController],
    exports: [ApplicationService]
})
export class ApplicationModule {}
