import { DataSource } from 'typeorm';
import { CaregiverEntity } from './entities/caregiver.entity';
import { AddressEntity } from 'src/utils/entities/address.entity';

export const caregiverProviders = [
    {
        provide: 'CAREGIVER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CaregiverEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'ADDRESS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AddressEntity),
        inject: ['DATA_SOURCE'],
    }
]