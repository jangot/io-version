import { Controller, Get, Render } from '@nestjs/common';
import { ViewContext } from 'src/decorator/view-context';
import { EnvironmentService } from 'src/module/environment/environment.service';
import { RuleKeyService } from 'src/module/rule/rule-key.service';
import { RuleService } from 'src/module/rule/rule.service';

@Controller('environments')
export class EnvironmentsPageController {
    constructor(
        private readonly ruleService: RuleService,
        private readonly ruleKeyService: RuleKeyService,
        private readonly environmentService: EnvironmentService,
    ) {}

    @Get('/')
    @Render('environments.ejs')
    async fake(@ViewContext() ctx) {
        const [
            rules,
            keys,
            environments
        ] = await Promise.all([
            this.ruleService.findAll(),
            this.ruleKeyService.findAll(),
            this.environmentService.findAll(),
        ]);

        const keysById = keys.reduce((memo, key) => {
            memo[key.id] = key;

            return memo;
        }, {});

        return {
            ctx,
            rules,
            keys,
            keysById,
            environments
        };
    }
}