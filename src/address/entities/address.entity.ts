import { CaregiverEntity } from "src/caregiver/entities/caregiver.entity";
import { ElderEntity } from "src/patients/entities/elder.entity";
import { ResponsibleEntity } from "src/patients/entities/responsible.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'address'})
export class AddressEntity {
    @PrimaryGeneratedColumn()
    id_address: number;

    @Column({type: "varchar",  nullable: false})
    cep: string;

    @Column({type: "varchar",  nullable: false})
    street: string;

    @Column({type: "varchar",  nullable: false})
    number: string;

    @Column({type: "varchar",  nullable: false})
    district: string;

    @Column({type: "varchar",  nullable: false})
    city: string;

    @Column({type: "varchar",  nullable: false})
    state: string;

    @Column({type: "varchar"})
    complement: string;  
    
    @OneToOne(()=> ResponsibleEntity, (responsible)=> responsible.address)
    responsible_id: ResponsibleEntity;

    @OneToOne(()=> ElderEntity, (elder)=> elder.address)
    elder_id: ElderEntity;

    @OneToOne(()=> CaregiverEntity, (caregiver)=> caregiver.address)
    caregiver_id: CaregiverEntity;
}