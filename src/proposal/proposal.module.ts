import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { proposalProviders } from './proposal.providers';
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';

@Module({
    imports: [],
    controllers: [ProposalController],
    providers: [...databaseProviders, ...proposalProviders, ProposalService],
})
export class ProposalModule {}