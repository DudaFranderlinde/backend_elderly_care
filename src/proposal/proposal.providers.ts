import { DataSource } from 'typeorm';
import { AddressEntity } from 'src/utils/entities/address.entity';
import { ElderEntity } from 'src/patients/entities/elder.entity';
import { ProposalEntity } from './entity/proposal.entity';
import { CaregiverEntity } from 'src/caregiver/entities/caregiver.entity';
import { ResponsibleEntity } from 'src/patients/entities/responsible.entity';

export const proposalProviders = [
    {
        provide: 'CAREGIVER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CaregiverEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'RESPONSIBLE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ResponsibleEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'ADDRESS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(AddressEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PROPOSAL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProposalEntity),
        inject: ['DATA_SOURCE'],
    }
]