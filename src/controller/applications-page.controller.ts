import { Controller, Get, Param, Post, Render } from '@nestjs/common';
import { ViewContext } from 'src/decorator/view-context';
import { ApplicationService } from 'src/module/application/application.service';
import { EnvironmentService } from 'src/module/environment/environment.service';
import { VersionService } from 'src/module/version/version.service';

@Controller('applications')
export class ApplicationsPageController {
    constructor(
        private readonly appService: ApplicationService,
        private readonly environmentService: EnvironmentService,
        private readonly versionService: VersionService,
    ){}

    @Get('/')
    @Render('applications.ejs')
    async applicationsPage(@ViewContext() ctx) {
        const [
            applications,
            environments,
            versions,
        ] = await Promise.all([
            this.appService.findAll(),
            this.environmentService.findAll(),
            this.versionService.findAll()
        ]);

        return {
            ctx,
            applications,
            environments,
            versions
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