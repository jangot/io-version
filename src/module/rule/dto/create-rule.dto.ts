import { IsNumber, IsString, Validate } from 'class-validator';
import { Environment } from 'src/module/environment/entities/environment.entity';
import { HasEntity } from 'src/utils/validators/HasEntity';
import { RuleKey } from '../entities/rule-key.entity';

export class CreateRuleDto {
    @IsNumber()
    @Validate(HasEntity, [RuleKey], {
        message: 'Rule key was not found.'
    })
    ruleKeyId: number;

    @IsString()
    value: string;

    @IsNumber()
    @Validate(HasEntity, [Environment], {
        message: 'Environment was not found.'
    })
    environmentId: number;
}
