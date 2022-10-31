import { DataSource, DataSourceOptions } from 'typeorm';

let instance: DataSource;

export function create(options: DataSourceOptions) {
    if (instance) {
        throw new Error('Data source was created');
    }

    instance = new DataSource(options);

    return instance;
}

export function getInstance(): DataSource {
    if (!instance) {
        throw new Error('DataSource was not created');
    }

    return instance;
}