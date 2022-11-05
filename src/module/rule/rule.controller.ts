import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RuleService } from './rule.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { CreateRuleKeyDto } from './dto/create-rule-key.dto';
import { RuleKeyService } from './rule-key.service';
import { ApiZone } from 'src/decorator/zone';

@ApiZone('rule')
export class RuleController {
    constructor(
        private readonly ruleService: RuleService,
        private readonly ruleKeyService: RuleKeyService,
    ) {}

    @Post()
    create(@Body() createRuleDto: CreateRuleDto) {
        return this.ruleService.create(createRuleDto);
    }

    @Post('key')
    createKey(@Body() createRuleKeyDto: CreateRuleKeyDto) {
        return this.ruleKeyService.create(createRuleKeyDto);
    }

    @Get()
    findAll() {
        return this.ruleService.findAll();
    }

    @Get('key')
    findAllKeys() {
        return this.ruleKeyService.findAll();
    }

    @Get('key/:id')
    findOneKey(@Param('id') id: string) {
        return this.ruleService.findOne(+id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ruleService.findOne(+id);
    }

    @Patch('key/:id')
    updateKey(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto) {
        return this.ruleService.update(+id, updateRuleDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto) {
        return this.ruleService.update(+id, updateRuleDto);
    }

    @Delete('key/:id')
    removeKey(@Param('id') id: string) {
        return this.ruleService.remove(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ruleService.remove(+id);
    }
}
