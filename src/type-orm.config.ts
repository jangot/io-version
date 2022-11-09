import { DataSource } from 'typeorm';

/**
 * Using
 * npm run migration:create ./src/migration/{MigrationName}
 * import new migration here to `migrations` section
 * npm run migration
 */

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'io_versions',
    migrations: [],
    entities: [],
});