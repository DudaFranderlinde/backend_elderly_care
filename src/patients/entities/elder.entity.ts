import { AddressEntity } from "src/address/entities/address.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResponsibleEntity } from "./responsible.entity";
import { CaregiverEntity } from "src/caregiver/entities/caregiver.entity";
import { ProposalEntity } from "src/proposal/entity/proposal.entity";

@Entity('elder')
export class ElderEntity{
    @PrimaryGeneratedColumn()
    id_elder: number;

    @ManyToOne(()=> ResponsibleEntity, (responsible)=> responsible.elder_id)
    @JoinColumn({name: 'responsible_id'})
    responsible_id: ResponsibleEntity;

    @ManyToOne(()=> CaregiverEntity, (caregiver)=> caregiver.elder_id)
    @JoinColumn({name: 'caregiver_id'})
    caregiver_id: CaregiverEntity;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false, unique: true})
    cpf: string;

    @Column({type: "varchar", nullable: false})
    photo: string;

    @Column({type: "varchar", nullable: false})
    date_birth: string;

    @OneToOne(() => AddressEntity, (address) => address.elder_id)
    @JoinColumn({name: 'address_id'})
    address: AddressEntity;

    @Column({type: "varchar", nullable: false})
    ministration: string;

    @Column({type: "varchar", nullable: false})
    historic: string;

    @OneToMany(()=> ProposalEntity, (proposal)=> proposal.elder_id)
    @JoinColumn({name: 'proposal_id'})
    proposal_id: ProposalEntity;
}