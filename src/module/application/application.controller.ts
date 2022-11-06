import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiZone } from 'src/decorator/zone';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@ApiZone('application')
export class ApplicationController {
    constructor(
        private readonly appService: ApplicationService
    ) {}

    @Post()
    async create(@Body() createApplicationDto: CreateApplicationDto) {
        return this.appService.create(createApplicationDto);
    }

    @Get()
    getApplications() {
        return this.appService.findAll();
    }

    @Patch(':id')
    editApp(@Param('id') id: string, updateApplicationDto: UpdateApplicationDto) {
        return this.appService.update(+id, updateApplicationDto);
    }

    @Delete(':id')
    removeApp(@Param('id') id: string) {
        return this.appService.remove(+id);
    }
}