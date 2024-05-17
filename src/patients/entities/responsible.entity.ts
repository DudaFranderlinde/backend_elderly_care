import { AddressEntity } from "src/utils/entities/address.entity";
import { Kinship } from "src/utils/enum/kinship-responsible.enum";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ElderEntity } from "./elder.entity";

@Entity({name: 'responsible'})
export class ResponsibleEntity {
    @PrimaryGeneratedColumn()
    id_responsible: number;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false, unique: true})
    cpf: string;

    @Column({type: "varchar", nullable: false})
    phone: string;

    @Column({type: "enum", nullable: false})
    kinship: Kinship;

    @Column({type: "varchar", nullable: false})
    email: string;

    @Column({type: "varchar", nullable: false})
    pass: string;

    @Column({type: "varchar", nullable: false})
    salt: string;

    @OneToOne(() => AddressEntity, (address) => address.responsible_id)
    address: AddressEntity;

    @OneToMany(()=> ElderEntity, (elder)=> elder.responsible_id)
    elder_id: ElderEntity;
}