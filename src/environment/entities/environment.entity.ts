import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
