import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ResponsibleEntity } from "../entities/responsible.entity";
import { AddressEntity } from "src/utils/entities/address.entity";
import { ElderEntity } from "../entities/elder.entity";
import { CreateAddressDto } from "src/utils/dto/createAddress.dto";
import { CreateResponsibleDto } from "../dto/createResponsible.dto";
import { CreateElderDto } from "../dto/createElder.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { CredentialResponsibleDto } from "../dto/credentialResponsible.dto";


@Injectable()
export class PatientService {
    constructor(
        @Inject('RESPONSIBLE_REPOSITORY')
        private responsibleRepository: Repository<ResponsibleEntity>,
        @Inject('ELDER_REPOSITORY')
        private elderRepository: Repository<ElderEntity>,
        @Inject('ADDRESS_REPOSITORY')
        private addressRepository: Repository<AddressEntity>,
        private jwtService: JwtService
    ){}

    checkCPF(cpf: string){
        const checkCFP = this.responsibleRepository.findOne({
            where: {
                cpf: cpf
            }
        });
        
        return checkCFP;
    }

    checkCPFElder(cpf: string){
        const checkCFP = this.elderRepository.findOne({
            where: {
                cpf: cpf
            }
        });
        
        return checkCFP;
    }

    private async hashPassword(senha: string, salt: string): Promise<string> {
        return bcrypt.hash(senha, salt);
    }

    async createResponsible(createAddress: CreateAddressDto, createResponsible: CreateResponsibleDto) {
        return new Promise<ResponsibleEntity>(async (resolve, reject) => {
            const {cep, street, number, district, city, state, complement} = createAddress;
            const {name, cpf, email, kinship, pass, phone} = createResponsible;            
    
            const checkSingUp = await this.checkCPF(cpf);
    
            if (checkSingUp !== null) {
                return resolve(null);
            }

            const address = this.addressRepository.create();
            address.cep = cep;
            address.street = street;
            address.number = number;
            address.district = district;
            address.city = city;
            address.state = state;
            address.complement = complement;
            const addressCreated = await this.addressRepository.save(address);

            const responsible = this.responsibleRepository.create();
            responsible.name = name;
            responsible.cpf = cpf;
            responsible.email = email;
            responsible.kinship = kinship;
            responsible.salt =  await bcrypt.genSalt();
            responsible.pass = await this.hashPassword(pass, responsible.salt);
            responsible.phone = phone;
            responsible.address = addressCreated;   
            
            const responsibleCreated = this.responsibleRepository.save(responsible);

            return resolve(responsibleCreated);    
        })
    }

    createElder(createAddress: CreateAddressDto, createElder: CreateElderDto, responsible: number) {
        return new Promise(async (resolve, reject) => {
            const {cep, street, number, district, city, state, complement} = createAddress;
            const {name, cpf, date_birth, historic, ministration} = createElder;

            const findResponsible = await this.responsibleRepository.findOne({
                where: {
                    id_responsible: responsible
                }
            });

            if(findResponsible === null){
                return resolve('responsible')
            }

            const checkSingUp = await this.checkCPFElder(cpf);
    
            if (checkSingUp !== null) {
                resolve(null);
                return
            }

            const address = this.addressRepository.create();
            address.cep = cep;
            address.street = street;
            address.number = number;
            address.district = district;
            address.city = city;
            address.state = state;
            address.complement = complement;
            const addressCreated = await this.addressRepository.save(address);

            const elder = this.elderRepository.create();
            elder.name = name;
            elder.cpf = cpf;
            elder.date_birth = date_birth;
            elder.historic = historic;
            elder.ministration = ministration;
            elder.address = addressCreated;
            elder.responsible_id = findResponsible;

            const elderCreated = await this.elderRepository.save(elder);
            return resolve(elderCreated);
        })
    }

    async checkPassword(pass: string, salt: string, originalPass: string): Promise<boolean> {
        const hash = await bcrypt.hash(pass, salt)
        return hash === originalPass? true: false;
    }

    async checkCredentials(credentials: CredentialResponsibleDto) {
        const { email, pass } = credentials;
        const user = await this.responsibleRepository.findOne({
            where: {
                email:email,
            }
        })

        if (user == null) {
            return(null)
        }
 
        const checkPass =  await this.checkPassword(pass, user.salt, user.pass)

        if (user && checkPass == true) {   
            return user;
        }
        return null;
    }

    async signIn(credentials: CredentialResponsibleDto) {
        const user = await this.checkCredentials(credentials);
        if (user === null) {
            return ('E-mail e/ou senha incorretos')
        }


        const jwtPayload = {
            id: user.id_responsible,
            nome: user.name,
            email: user.email
        }

        const token = this.jwtService.sign(jwtPayload, { secret: `${process.env.JWT_SECRET}` });
        return { token }
    }

    getProfile(id: number){
        return new Promise(async (resolve, reject)=> {
            try {
                const foundResponsible = await this.responsibleRepository.findOne({
                    where: {
                        id_responsible: id,
                    },
                    relations:{
                        address: true,
                        elder_id: {
                            address: true
                        },
                    }
                })
                
                delete foundResponsible.id_responsible
                delete foundResponsible.pass
                delete foundResponsible.salt

                if (foundResponsible.address.complement == null) {
                    delete foundResponsible.address.complement
                }

               return resolve(foundResponsible)
            } catch (error) {
                reject(error)
            }
        })
    }
}