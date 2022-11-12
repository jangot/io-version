import { Application } from 'src/module/application/application.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';

@Entity()
@Index(['version', 'application'], { unique: true })
export class Version {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    version: string;

    @ManyToOne(() => Application, (application) => application.versions, { nullable: false })
    application: Application;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}
