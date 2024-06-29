import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ResponsibleEntity } from "./entities/responsible.entity";
import { AddressEntity } from "src/address/entities/address.entity";
import { ElderEntity } from "./entities/elder.entity";
import { CreateAddressDto } from "src/address/dto/createAddress.dto";
import { CreateResponsibleDto } from "./dto/createResponsible.dto";
import { CreateElderDto } from "./dto/createElder.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { CredentialResponsibleDto } from "./dto/credentialResponsible.dto";
import { UpdateElderDto } from "./dto/updateElder.dto";
import { UpdateResponsibleDto } from "./dto/updateResponsible.dto";


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

    async checkEmail(email: string) {
        const user = await this.responsibleRepository.findOne({
            where: {
                email:email,
            }
        })

        return user
    }

    async checkAge(date: string) {
        const format = date.split('/')
        const day = parseInt(format[0])
        const month = parseInt(format[1])
        const year = parseInt(format[2])
        const date_birth = new Date(year, month, day)
        const today = new Date()
        let age = today.getFullYear().valueOf() - date_birth.getFullYear().valueOf();
        const monthDiff = today.getMonth() - date_birth.getMonth();
        const dayDiff = today.getDate() - date_birth.getDate();
    
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age = age - 1 ;
        }

        if (age >= 18) {
            return true
        }

        return false
    }

    private async hashPassword(senha: string, salt: string): Promise<string> {
        return bcrypt.hash(senha, salt);
    }

    async createResponsible(createAddress: CreateAddressDto, createResponsible: CreateResponsibleDto) {
        return new Promise(async (resolve, reject) => {
            const {cep, street, number, district, city, state, complement} = createAddress;
            const {name, cpf, email, kinship, pass, phone, date_birth, photo} = createResponsible;            
    
            const checkSingUp = await this.checkCPF(cpf);
            const checkEmail = await this.checkEmail(email);
    
            if (checkSingUp !== null) {
                return resolve("cpf");
            }

            console.log(checkEmail);
            
            if (checkEmail !== null) {
                return resolve("email");
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

            if (await this.checkAge(date_birth) === false) {
                return resolve('idade')
            }

            const responsible = this.responsibleRepository.create();
            responsible.name = name;
            responsible.cpf = cpf;
            responsible.date_birth = date_birth;
            responsible.photo = photo;
            responsible.email = email;
            responsible.kinship = kinship;
            responsible.salt =  await bcrypt.genSalt();
            responsible.pass = await this.hashPassword(pass, responsible.salt);
            responsible.phone = phone;
            responsible.address = addressCreated;   
            
            const responsibleCreated = await this.responsibleRepository.save(responsible);

            return resolve(responsibleCreated.id_responsible);    
        })
    }

    createElder(createAddress: CreateAddressDto, createElder: CreateElderDto, responsible: number) {
        return new Promise(async (resolve, reject) => {
            const {cep, street, number, district, city, state, complement} = createAddress;
            const {name, cpf, date_birth, historic, ministration, photo} = createElder;

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
            elder.photo = photo;
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
        const { email, password } = credentials;
        const user = await this.responsibleRepository.findOne({
            where: {
                email:email,
            }
        })

        if (user == null) {
            return(null)
        }
 
        const checkPass =  await this.checkPassword(password, user.salt, user.pass)

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
    
    async updateElder(updateProfileDto: UpdateElderDto, id_elder: number){
        return new Promise(async (resolve, reject) => {
          try {
            let { address } = updateProfileDto;
            
            const findElder = await this.elderRepository.findOne({
                where:{
                    id_elder: id_elder
                }
            });

            const findAddress = await this.addressRepository.findOne({
                where: {
                    elder_id: findElder
                }
            })

            const {id_address} = findAddress

            if(!findElder){
              return reject({message: `ID de Paciente ${id_elder} não foi encontrada`})
            }

            if (address !== undefined) {
                await this.addressRepository.update(id_address, address);
                delete updateProfileDto.address
            }

            await this.elderRepository.update(id_elder, updateProfileDto);

            resolve({ message: 'Informações atualizadas' });
    
          } catch (error) {
            reject({ message: 'Nenhum campo válido recebido para atualizar informações', code: 400 });
          }
        });
    }

    async update(updateProfileDto: UpdateResponsibleDto, id_responsible: number){
        return new Promise(async (resolve, reject) => {
          try {
            let { address } = updateProfileDto;

            console.log("care");
            
            const findCaregiver = await this.responsibleRepository.findOne({
                where:{
                    id_responsible: id_responsible
                }
            });
            
            if(!findCaregiver){
                return reject({message: `ID de Responsável ${id_responsible} não foi encontrada`})
              }

            console.log("address");

            const findAddress = await this.addressRepository.findOne({
                where: {
                    responsible_id: findCaregiver
                }
            });

            const {id_address} = findAddress

            if (address !== undefined) {
                await this.addressRepository.update(id_address, address);
                delete updateProfileDto.address
            }

            if (updateProfileDto.pass !== undefined) {
                updateProfileDto.pass = await this.hashPassword(updateProfileDto.pass, findCaregiver.salt)
            }

            if (updateProfileDto.email  !== undefined) {
                const checkEmail = await this.checkEmail(updateProfileDto.email)
                if (checkEmail !== null && checkEmail.id_responsible !== id_responsible) {
                    return resolve('email')
                }
            }

            await this.responsibleRepository.update(id_responsible, updateProfileDto);
            resolve({ message: 'Informações atualizadas' });
    
          } catch (error) {
            reject({ message: 'Nenhum campo válido recebido para atualizar informações', code: 400 });
          }
        });
    }
}