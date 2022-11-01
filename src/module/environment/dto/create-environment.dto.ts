import { IsString, IsNumber } from 'class-validator'

export class CreateEnvironmentDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    orderIndex: number;
}
