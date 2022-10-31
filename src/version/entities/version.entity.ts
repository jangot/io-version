import { Application } from 'src/application/application.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Version {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    version: string;

    @ManyToOne(() => Application, (application) => application.versions)
    application: Application;
}
