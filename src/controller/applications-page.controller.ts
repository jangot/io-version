import { Controller, Get, Param, Render } from '@nestjs/common';
import * as moment from 'moment';
import { ViewContext } from 'src/decorator/view-context';
import { ApplicationService } from 'src/module/application/application.service';
import { DeployService } from 'src/module/deploy/deploy.service';
import { EnvironmentService } from 'src/module/environment/environment.service';
import { VersionService } from 'src/module/version/version.service';

@Controller('applications')
export class ApplicationsPageController {
    constructor(
        private readonly appService: ApplicationService,
        private readonly environmentService: EnvironmentService,
        private readonly versionService: VersionService,
        private readonly deployService: DeployService,
    ){}

    @Get('/')
    @Render('apps.ejs')
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
        const [
            application,
            environments,
            versions,
            deploes
        ] = await Promise.all([
            this.appService.findOne(+id),
            this.environmentService.findAll(),
            this.versionService.findAll(),
            this.deployService.findByAppicationId(+id)
        ]);

        return {
            moment,
            ctx,
            id,
            application,
            environments,
            versions,
            appDeploes: deploes.reduce((memo, it) => {
                memo[it.id] = it;

                return memo;
            }, {})
        }
    }
}