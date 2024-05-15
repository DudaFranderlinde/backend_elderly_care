import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'address'})
export class AddressEntity {
    @PrimaryGeneratedColumn()
    id_address: number;

    @Column({type: "varchar",  nullable: false})
    cep: string;

    @Column({type: "varchar",  nullable: false})
    logradouro: string;

    @Column({type: "varchar",  nullable: false})
    numero: string;

    @Column({type: "varchar",  nullable: false})
    bairro: string;

    @Column({type: "varchar",  nullable: false})
    cidade: string;

    @Column({type: "varchar",  nullable: false})
    estado: string;

    @Column({type: "varchar", default: null})
    complemento: string;    
}