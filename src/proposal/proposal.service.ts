import { Inject, Injectable } from "@nestjs/common";
import { ResponsibleEntity } from "src/patients/entities/responsible.entity";
import { Repository } from "typeorm";
import { CreateProposalDto } from "./dto/createProposal.dto";
import { ProposalEntity } from "./entity/proposal.entity";
import { CaregiverEntity } from "src/caregiver/entities/caregiver.entity";
import { UpdateStatusDto } from "./dto/updateStatus.dto";
import { Status } from "src/utils/enum/proposal-status.enum";
import { ElderEntity } from "src/patients/entities/elder.entity";

@Injectable()
export class ProposalService {
    constructor(
        @Inject('CAREGIVER_REPOSITORY')
        private caregiverRepository: Repository<CaregiverEntity>,
        @Inject('ELDER_REPOSITORY')
        private elderRepository: Repository<ElderEntity>,
        @Inject('PROPOSAL_REPOSITORY')
        private proposalRepository: Repository<ProposalEntity>,
    ){}

    async createProposal(createProposal: CreateProposalDto) {
        return new Promise<ProposalEntity>(async (resolve, reject) => {
            const { caregiver_id, elder_id } = createProposal;

            const findCaregiver = await this.caregiverRepository.findOne({
                where: {
                    id_caregiver: caregiver_id
                }
            })

            if (!findCaregiver) {
                return reject({message: `ID de Cuidador não foi encontrada`})
            }

            const findElder = await this.elderRepository.findOne({
                where: {
                    id_elder: elder_id
                }
            })

            if (!findElder) {
                return reject({message: `ID de Responsável não foi encontrada`})
            }

            const proposal = this.proposalRepository.create();
            proposal.caregiver_id = findCaregiver;
            proposal.elder_id = findElder;

            const proposalCreated = await this.proposalRepository.save(proposal);   
            return resolve(proposalCreated);
        })
    }

    async getAllProposal(){
        return new Promise(async (resolve, reject) => {
            try {
                const findProposal = await this.proposalRepository.find({
                    relations: {
                        elder_id: true,
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
                        elder_id: {
                            responsible_id: true
                        }
                    }
                });

                findProposal.forEach((e)=> {
                    const format = e.elder_id.date_birth.split('/')
                    const day = parseInt(format[0])
                    const month = parseInt(format[1])
                    const year = parseInt(format[2])
                    const date_birth = new Date(year, month, day)
                    
                    const today = new Date()
                    let age = today.getFullYear().valueOf() - date_birth.getFullYear().valueOf();
                    
                    const monthDiff = today.getMonth() - date_birth.getMonth();
                    const dayDiff = today.getDate() - date_birth.getDate();
                
                    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                        age = age - 1 ;
                    }

                    if (age < 0) {
                        age = 0
                    }

                    e.elder_id.date_birth = age.toString()
                })

                const filtreProposal = findProposal.filter((e)=> e.status !== Status.RECUSADO)
                return resolve(filtreProposal)
            } catch (error) {
                reject({ message: 'Ocorreu um erro! Tente novamente mais tarde.', code: 400 });      
            }
        })
    }

    async updateStatus(update: UpdateStatusDto){
        return new Promise(async (resolve, reject) => {
            try {
                const { status, id_status } = update

                const findProposal = await this.proposalRepository.find({
                    where: {
                        id_proposal: id_status
                    }
                });

                if (!findProposal) {
                    return reject({message: `ID de Cuidador não foi encontrada`})
                }

                if (status) {
                    await this.proposalRepository.update(id_status, {status: Status.ACEITO})
                    await this
                    return resolve({message: 'Informações atualizadas!'}) 
                }
                
                if (!status) {
                    await this.proposalRepository.update(id_status, {status: Status.RECUSADO})
                    return resolve({message: 'Informações atualizadas!'}) 
                }
            } catch (error) {
                reject({ message: 'Ocorreu um erro! Tente novamente mais tarde.', code: 400 });      
            }
        })
    }
}
