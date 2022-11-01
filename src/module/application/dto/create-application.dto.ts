import { IsBoolean, IsString } from "class-validator";

export class CreateApplicationDto {
    @IsString()
    name: string;

    @IsBoolean()
    isActive: boolean;
}