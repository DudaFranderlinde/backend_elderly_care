import { AddressEntity } from "src/utils/entities/address.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResponsibleEntity } from "./responsible.entity";
import { CaregiverEntity } from "src/caregiver/entities/caregiver.entity";

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
    date_birth: string;

    @OneToOne(() => AddressEntity, (address) => address.elder_id)
    @JoinColumn({name: 'address_id'})
    address: AddressEntity;

    @Column({type: "varchar", nullable: false})
    ministration: string;

    @Column({type: "varchar", nullable: false})
    historic: string;
}