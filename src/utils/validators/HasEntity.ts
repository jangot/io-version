import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getInstance } from '../factories/dataSource';

@ValidatorConstraint()
export class HasEntity implements ValidatorConstraintInterface {
    async validate(id: string, validationArguments: ValidationArguments) {
        const EntityClass = validationArguments.constraints[0];

        const entityRepository = getInstance().getRepository(EntityClass)

        const list = await entityRepository.find({ where: { id } });

        return list.length > 0;
    }
}