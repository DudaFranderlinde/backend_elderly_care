import { AddressEntity } from "src/utils/entities/address.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResponsibleEntity } from "./responsible.entity";

@Entity('elder')
export class ElderEntity{
    @PrimaryGeneratedColumn()
    id_elder: number;

    @ManyToOne(()=> ResponsibleEntity, (responsible)=> responsible.elder_id)
    responsible_id: ResponsibleEntity;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false, unique: true})
    cpf: string;

    @Column({type: "varchar", nullable: false})
    date_birth: string;

    @OneToOne(() => AddressEntity, (address) => address.elder_id)
    address: AddressEntity;

    @Column({type: "varchar", nullable: false})
    ministration: string;

    @Column({type: "varchar", nullable: false})
    historic: string;
}