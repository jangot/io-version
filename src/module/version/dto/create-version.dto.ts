import { IsNumber, IsString, Matches, Validate } from 'class-validator'
import { Application } from 'src/module/application/application.entity';
import { Environment } from 'src/module/environment/entities/environment.entity';
import { HasEntity } from 'src/utils/validators/HasEntity';

// TODO add validation for uniq version/app/env
export class CreateVersionDto {
    @IsString()
    @Matches(/^(\d{1,})\.(\d{1,}).(\d{1,})/)
    version: string;

    @IsNumber()
    @Validate(HasEntity, [Application], {
        message: 'Application with the `id` was not found.'
    })
    applicationId: number;
}
