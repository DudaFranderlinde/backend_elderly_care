import { CaregiverEntity } from "src/caregiver/entities/caregiver.entity";
import { ElderEntity } from "src/patients/entities/elder.entity";
import { Status } from "src/utils/enum/proposal-status.enum";
import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('proposal')
export class ProposalEntity {
    @PrimaryGeneratedColumn()
    id_proposal: number;

    @Column({type: "decimal", nullable: false})
    valor_hora: number;

    @Column({type: "enum", enum: Status, nullable: false, default: Status.ENVIADO})
    status: Status;

    @OneToOne(()=> CaregiverEntity, (caregiver)=> caregiver.address)
    caregiver_id: CaregiverEntity;
    
    @OneToOne(()=> ElderEntity, (elder)=> elder.address)
    elder_id: ElderEntity;
}