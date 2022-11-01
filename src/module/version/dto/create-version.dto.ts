import { IsNumber, IsString, Validate } from 'class-validator'
import { Application } from 'src/module/application/application.entity';
import { HasEntity } from 'src/utils/validators/HasEntity';

export class CreateVersionDto {
    @IsString()
    version: string;

    @IsNumber()
    @Validate(HasEntity, [Application], {
        message: 'Application with the `id` was not found.'
    })
    applicationId: number;
}
