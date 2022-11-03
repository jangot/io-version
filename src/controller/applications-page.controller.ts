import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { ViewContext } from 'src/decorator/view-context';
import { ApplicationService } from 'src/module/application/application.service';
import { CreateApplicationDto } from 'src/module/application/dto/create-application.dto';
import { EnvironmentService } from 'src/module/environment/environment.service';

@Controller('applications')
export class ApplicationsPageController {
    constructor(
        private readonly appService: ApplicationService,
        private readonly environmentService: EnvironmentService,
    ){}

    @Get('/')
    @Render('applications.ejs')
    async applicationsPage(@ViewContext() ctx) {
        const [
            applications,
            environments,
        ] = await Promise.all([
            this.appService.findAll(),
            this.environmentService.findAll()
        ]);

        return {
            ctx,
            applications,
            environments
        };
    }


    @Get(':id')
    @Render('application.ejs')
    async applicationItemPage(@Param('id') id: string, @ViewContext() ctx) {
        const application = await this.appService.findOne(+id);

        return {
            id,
            application,
            ctx
        }
    }
}