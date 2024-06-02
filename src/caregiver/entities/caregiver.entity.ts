import { ElderEntity } from "src/patients/entities/elder.entity";
import { AddressEntity } from "src/utils/entities/address.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('caregiver')
export class CaregiverEntity {
    @PrimaryGeneratedColumn()
    id_caregiver: number;

    @OneToMany(()=> ElderEntity, (elder)=> elder.caregiver_id)
    elder_id: ElderEntity;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false, unique: true})
    cpf: string;

    @Column({type: "varchar", nullable: false})
    email: string;

    @Column({type: "varchar", nullable: false})
    date_birth: string;

    @OneToOne(() => AddressEntity, (address) => address.caregiver_id, {cascade:true})
    @JoinColumn({name: 'address_id'})
    address: AddressEntity;

    @Column({type: "varchar", nullable: false})
    experience: string;

    @Column({type: "varchar", nullable: false})
    description_experience: string;

    @Column({type: "varchar", nullable: false})
    training_time: string;

    @Column({type: "varchar", nullable: false})
    password: string;

    @Column({type: "varchar", nullable: false})
    salt: string;
}