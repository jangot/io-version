import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RuleService } from './rule.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { CreateRuleKeyDto } from './dto/create-rule-key.dto';
import { RuleKeyService } from './rule-key.service';
import { ApiZoneController } from 'src/decorator/zone';
import { UpdateRuleKeyDto } from './dto/update-rule-key.dto';

@ApiZoneController('rule')
export class RuleController {
    constructor(
        private readonly ruleService: RuleService,
        private readonly ruleKeyService: RuleKeyService,
    ) {}

    // Keys
    @Post('key')
    createKey(@Body() createRuleKeyDto: CreateRuleKeyDto) {
        return this.ruleKeyService.create(createRuleKeyDto);
    }

    @Get('key')
    findAllKeys() {
        return this.ruleKeyService.findAll();
    }

    @Get('key/:id')
    findOneKey(@Param('id') id: string) {
        return this.ruleKeyService.findOne(+id);
    }

    @Patch('key/:id')
    updateKey(@Param('id') id: string, @Body() updateRuleKeyDto: UpdateRuleKeyDto) {
        return this.ruleKeyService.update(+id, updateRuleKeyDto);
    }

    @Delete('key/:id')
    removeKey(@Param('id') id: string) {
        return this.ruleKeyService.remove(+id);
    }

    // Rules
    @Post()
    create(@Body() createRuleDto: CreateRuleDto) {
        return this.ruleService.create(createRuleDto);
    }

    @Get()
    findAll() {
        return this.ruleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ruleService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto) {
        return this.ruleService.update(+id, updateRuleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ruleService.remove(+id);
    }
}
