import { Application } from 'src/module/application/application.entity';
import { Environment } from 'src/module/environment/entities/environment.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Version {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    version: string;

    @ManyToOne(() => Application, (application) => application.versions)
    application: Application;

    @ManyToOne(() => Environment, (environment) => environment.versions)
    environment: Environment;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}
