import { IsString, Matches } from 'class-validator';

export class CreateRuleKeyDto {
    @IsString()
    @Matches(/^[a-z]\S*$/)
    name: string;
}
