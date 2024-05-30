import { ElderEntity } from "src/patients/entities/elder.entity";
import { AddressEntity } from "src/utils/entities/address.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('caregiver')
export class CaregiverEntity {
    @PrimaryGeneratedColumn()
    id_caregiver: number;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false, unique: true})
    cpf: string;

    @Column({type: "varchar", nullable: false})
    date_birth: string;

    @OneToOne(() => AddressEntity, (address) => address.elder_id)
    address: AddressEntity;

    @Column({type: "varchar", nullable: false})
    experience: string;

    @Column({type: "varchar", nullable: false})
    training_time: string;
}