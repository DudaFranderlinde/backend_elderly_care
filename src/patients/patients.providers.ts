import { DataSource } from 'typeorm';
import { ResponsibleEntity } from './entities/responsible.entity';
import { ElderEntity } from './entities/elder.entity';
import { AddressEntity } from 'src/address/entities/address.entity';

export const patientsProviders = [
    {
        provide: 'RESPONSIBLE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ResponsibleEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'ELDER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ElderEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'ADDRESS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AddressEntity),
        inject: ['DATA_SOURCE'],
    }
]