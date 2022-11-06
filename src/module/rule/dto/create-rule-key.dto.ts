import { IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class CreateRuleKeyDto {
    @IsString()
    @Matches(/^[a-z]\S*$/, { message: 'Name shoud start from a letter and should not have spaces.' })
    name: string;

    @IsNumber()
    @IsOptional()
    specificity?: number;
}
