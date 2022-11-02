import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { ViewContext } from 'src/decorator/view-context';
import { ApplicationService } from 'src/module/application/application.service';
import { CreateApplicationDto } from 'src/module/application/dto/create-application.dto';

@Controller('applications')
export class ApplicationsPageController {
    constructor(
        private readonly appService: ApplicationService,
    ){}

    @Get('/')
    @Render('applications.ejs')
    async applicationsPage(@ViewContext() ctx) {
        const applications = await this.appService.findAll();

        return {
            ctx,
            applications
        };
    }

    @Post('/')
    @Render('applications.ejs')
    async createApplicationsPage(
        @Body() createApplicationDto: CreateApplicationDto,
        @ViewContext() ctx
    ) {
        await this.appService.create(createApplicationDto);

        const applications = await this.appService.findAll();

        return {
            ctx,
            applications
        };
    }

    @Get(':name')
    @Render('application.ejs')
    async applicationItemPage(@Param('name') name: string, @ViewContext() ctx) {
        const application = await this.appService.findOneByName(name);

        return {
            name,
            application,
            ctx
        }
    }
}