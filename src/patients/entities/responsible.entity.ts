import { AddressEntity } from "src/address/entities/address.entity";
import { Kinship } from "src/utils/enum/kinship-responsible.enum";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ElderEntity } from "./elder.entity";
import { ProposalEntity } from "src/proposal/entity/proposal.entity";

@Entity({name: 'responsible'})
export class ResponsibleEntity {
    @PrimaryGeneratedColumn()
    id_responsible: number;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false, unique: true})
    cpf: string;

    @Column({type: "varchar", nullable: false})
    photo: string;

    @Column({type: "varchar", nullable: false})
    phone: string;

    @Column({type: "varchar", nullable: false})
    date_birth: string;

    @Column({type: "enum", enum: Kinship, nullable: false})
    kinship: Kinship;

    @Column({type: "varchar", nullable: false, unique: true})
    email: string;

    @Column({type: "varchar", nullable: false})
    pass: string;

    @Column({type: "varchar", nullable: false})
    salt: string;

    @OneToOne(() => AddressEntity, (address) => address.responsible_id)
    @JoinColumn({name: 'address_id'})
    address: AddressEntity;

    @OneToMany(()=> ElderEntity, (elder)=> elder.responsible_id)
    @JoinColumn({name: 'elder_id'})
    elder_id: ElderEntity;

    @OneToMany(()=> ProposalEntity, (proposal)=> proposal.resposible_id)
    @JoinColumn({name: 'proposal_id'})
    proposal_id: ProposalEntity;
}