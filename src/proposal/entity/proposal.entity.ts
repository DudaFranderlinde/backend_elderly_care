import { CaregiverEntity } from "src/caregiver/entities/caregiver.entity";
import { ElderEntity } from "src/patients/entities/elder.entity";
import { ResponsibleEntity } from "src/patients/entities/responsible.entity";
import { Status } from "src/utils/enum/proposal-status.enum";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('proposal')
export class ProposalEntity {
    @PrimaryGeneratedColumn()
    id_proposal: number;

    @ManyToOne(()=> CaregiverEntity, (caregiver)=> caregiver.proposal_id)
    @JoinColumn({name:"caregiver_id"})
    caregiver_id: CaregiverEntity;
    
    @ManyToOne(()=> ElderEntity, (elder)=> elder.proposal_id)
    @JoinColumn({name:"elder_id"})
    elder_id: ElderEntity;

    @Column({type: "enum", enum: Status, nullable: false, default: Status.ENVIADO})
    status: Status;
}