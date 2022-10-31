import { Controller, Get } from '@nestjs/common';
import { ApplicationService } from './application.service';

@Controller('/application')
export class ApplicationController {
    constructor(
        private readonly appService: ApplicationService
    ) {}

    @Get('/')
    async getApplications() {
        return this.appService.findAll();
    }
}