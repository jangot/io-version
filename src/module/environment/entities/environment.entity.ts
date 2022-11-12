import { Rule } from 'src/module/rule/entities/rule.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Environment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false, default: 1 })
    orderIndex: number;

    @OneToMany(() => Rule, (rule) => rule.environment)
    rules: Rule[];
}
