import { Environment } from 'src/module/environment/entities/environment.entity';
import { Version } from 'src/module/version/entities/version.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Index(['version', 'environment'], { unique: true })
export class Deploy {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Version, (version) => version.deploy, { nullable: false })
    version: Version;

    @Column()
    versionId: number;

    @ManyToOne(() => Environment, (env) => env.deploy, { nullable: false })
    environment: Environment;

    @Column()
    environmentId: number;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}
