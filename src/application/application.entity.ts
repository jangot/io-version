import { Version } from 'src/version/entities/version.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Version, (version) => version.application)
    versions: Version[]
}
