import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('/application')
export class ApplicationController {
    constructor(
        private readonly appService: ApplicationService
    ) {}

    @Post()
    async create(@Body() createApplicationDto: CreateApplicationDto) {
        return this.appService.create(createApplicationDto);
    }

    @Get('/')
    async getApplications() {
        return this.appService.findAll();
    }
}