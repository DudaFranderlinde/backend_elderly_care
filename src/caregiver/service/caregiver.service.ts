import { Inject, Injectable } from "@nestjs/common";
import { CaregiverEntity } from "../entities/caregiver.entity";
import { AddressEntity } from "src/utils/entities/address.entity";
import { Repository } from "typeorm";
import { CreateCaregiverDTO } from "../dto/createCaregiver.dto";
import { CreateAddressDto } from "src/utils/dto/createAddress.dto";
import * as bcrypt from 'bcrypt';
import { CredentialCaregiverDto } from "../dto/credentialsCaregiver.dto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class CaregiverService {
    constructor(
        @Inject('CAREGIVER_REPOSITORY')
        private caregiverRepository: Repository<CaregiverEntity>,
        @Inject('ADDRESS_REPOSITORY')
        private addressRepository: Repository<AddressEntity>,
        private jwtService: JwtService
    ) {}

    checkCPF(cpf: string){
        const checkCFP = this.caregiverRepository.findOne({
            where: {
                cpf: cpf
            }
        });
        
        return checkCFP;
    }

    private async hashPassword(senha: string, salt: string): Promise<string> {
        return bcrypt.hash(senha, salt);
    }

    createUser(createCaregiver: CreateCaregiverDTO, createAddress: CreateAddressDto) {
        return new Promise(async (resolve, reject) => {
            try {
                const {name, cpf, date_birth, description_experience, experience, training_time, email, password} = createCaregiver;
                const {cep, street, number, district, city, state, complement} = createAddress;

                const checkSingUp = await this.checkCPF(cpf);

                if (checkSingUp !== null) {
                    resolve(null)
                }

                const address = this.addressRepository.create()
                address.cep = cep;
                address.street = street;
                address.number = number;
                address.district = district;
                address.city = city;
                address.state = state;
                address.complement = complement;
                const addressCreated = await this.addressRepository.save(address)


                const caregiver = this.caregiverRepository.create()
                caregiver.name = name;
                caregiver.email = email;
                caregiver.cpf = cpf;
                caregiver.salt = await bcrypt.genSalt();
                caregiver.password = await this.hashPassword(password, caregiver.salt);
                caregiver.date_birth = date_birth;
                caregiver.description_experience = description_experience;
                caregiver.experience = experience;
                caregiver.training_time = training_time;
                caregiver.address = addressCreated;

                const caregiverCreated = await this.caregiverRepository.save(caregiver);

                const find = await this.caregiverRepository.find({
                    where: {
                        id_caregiver: caregiverCreated.id_caregiver
                    }
                })
                
                delete caregiver.password;
                delete caregiver.salt;
                resolve(caregiverCreated);

            } catch (error) {
                
            }
        })
    }

    getProfile(id: number){
        return new Promise(async (resolve, reject)=> {
            try {
                const foundCaregiver = await this.caregiverRepository.findOne({
                    where: {
                        id_caregiver: id,
                    },
                    relations:{
                        address: true
                    }
                })
                
                delete foundCaregiver.id_caregiver
                delete foundCaregiver.password
                delete foundCaregiver.salt

                if (foundCaregiver.address.complement == null) {
                    delete foundCaregiver.address.complement
                }

               return resolve(foundCaregiver)
            } catch (error) {
                reject(error)
            }
        })
    }

    async checkPassword(pass: string, salt: string, originalPass: string): Promise<boolean> {
        const hash = await bcrypt.hash(pass, salt)
        return hash === originalPass? true: false;
    }

    async checkCredentials(credentials: CredentialCaregiverDto) {
        const { email, password } = credentials;
        const user = await this.caregiverRepository.findOne({
            where: {
                email:email,
            }
        })

        if (user == null) {
            return(null)
        }
 
        const checkPass =  await this.checkPassword(password, user.salt, user.password)

        if (user && checkPass == true) {   
            return user;
        }
        return null;
    }

    async signIn(credentials: CredentialCaregiverDto) {
        const user = await this.checkCredentials(credentials);
        if (user === null) {
            return ('E-mail e/ou senha incorretos')
        }


        const jwtPayload = {
            id: user.id_caregiver,
            nome: user.name,
            email: user.email
        }

        const token = this.jwtService.sign(jwtPayload, { secret: `${process.env.JWT_SECRET}` });
        return { token }
    }
}