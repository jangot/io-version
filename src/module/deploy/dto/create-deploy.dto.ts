import { IsNumber, Validate } from 'class-validator';
import { Environment } from 'src/module/environment/entities/environment.entity';
import { Version } from 'src/module/version/entities/version.entity';
import { HasEntity } from 'src/utils/validators/HasEntity';

export class CreateDeployDto {
    @Validate(HasEntity, [Version], {
        message: 'Version with the `id` was not found.'
    })
    @IsNumber()
    versoinId: number;

    @Validate(HasEntity, [Environment], {
        message: 'Environment with the `id` was not found.'
    })
    @IsNumber()
    environmentId: number;
}
