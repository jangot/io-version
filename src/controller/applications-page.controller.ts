import { Controller, Get, Render } from "@nestjs/common";

@Controller('applications')
export class ApplicationsPageController {
    @Get('/')
    @Render('applications.hbs')
    applicationsPage() {
        return {};
    }
}