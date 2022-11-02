import { Version } from 'src/module/version/entities/version.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Environment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    orderIndex: number;

    @OneToMany(() => Version, (version) => version.application)
    versions: Version[]
}
