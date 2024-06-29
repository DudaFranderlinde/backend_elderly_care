import { Inject, Injectable } from "@nestjs/common";
import { ResponsibleEntity } from "src/patients/entities/responsible.entity";
import { Repository } from "typeorm";
import { CreateProposalDto } from "./dto/createProposal.dto";
import { ProposalEntity } from "./entity/proposal.entity";
import { CaregiverEntity } from "src/caregiver/entities/caregiver.entity";

@Injectable()
export class ProposalService {
    constructor(
        @Inject('CAREGIVER_REPOSITORY')
        private caregiverRepository: Repository<CaregiverEntity>,
        @Inject('RESPONSIBLE_REPOSITORY')
        private responsibleRepository: Repository<ResponsibleEntity>,
        @Inject('PROPOSAL_REPOSITORY')
        private proposalRepository: Repository<ProposalEntity>,
    ){}

    async createProposal(createProposal: CreateProposalDto, responsible: number) {
        return new Promise<ProposalEntity>(async (resolve, reject) => {
            const { caregiver_id } = createProposal;

            const findCaregiver = await this.caregiverRepository.findOne({
                where: {
                    id_caregiver: caregiver_id
                }
            })

            if (!findCaregiver) {
                return reject({message: `ID de Cuidador não foi encontrada`})
            }

            const findResponsible = await this.responsibleRepository.findOne({
                where: {
                    id_responsible: responsible
                }
            })

            if (!findResponsible) {
                return reject({message: `ID de Responsável não foi encontrada`})
            }

            const proposal = this.proposalRepository.create();
            proposal.caregiver_id = findCaregiver;
            proposal.resposible_id = findResponsible;

            const proposalCreated = await this.proposalRepository.save(proposal);   
            return resolve(proposalCreated);
        })
    }

    async getAllProposal(){
        return new Promise(async (resolve, reject) => {
            try {
                const findProposal = await this.proposalRepository.find({
                    relations: {
                        resposible_id: true,
                        caregiver_id: true
                    }
                });
                return resolve(findProposal)
            } catch (error) {
                reject({ message: 'Ocorreu um erro! Tente novamente mais tarde.', code: 400 });      
                
            }
        })
    }

    async getMyProposal(id: number){
        return new Promise(async (resolve, reject) => {
            try {
                const findProposal = await this.proposalRepository.find({
                    where: {
                        caregiver_id: {
                            id_caregiver: id
                        }
                    },
                    relations: {
                        resposible_id: true,
                        caregiver_id: true
                    }
                });
                return resolve(findProposal)
            } catch (error) {
                reject({ message: 'Ocorreu um erro! Tente novamente mais tarde.', code: 400 });      
            }
        })
    }
}
