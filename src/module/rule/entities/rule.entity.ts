import { Environment } from 'src/module/environment/entities/environment.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RuleKey } from './rule-key.entity';

@Entity()
@Index(['key', 'value', 'environment'], { unique: true })
export class Rule {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => RuleKey, (ruleKey) => ruleKey.rules, { nullable: false })
    key: RuleKey;

    @Column()
    keyId: number;

    @Column({ nullable: false })
    value: string;

    @ManyToOne(() => Environment, (env) => env.rules, { nullable: false })
    environment: Environment;

    @Column()
    environmentId: number;
}
