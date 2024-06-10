import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { PatientService } from "../service/patients.service";
import { CreateElderDto } from "../dto/createElder.dto";
import { CreateResponsibleDto } from "../dto/createResponsible.dto";
import { CreateAddressDto } from "src/utils/dto/createAddress.dto";
import { ElderEntity } from "../entities/elder.entity";
import { CredentialResponsibleDto } from "../dto/credentialResponsible.dto";

@Controller('patients')
export class PatientsController {
    constructor(
        private service: PatientService
    ){}

    @Post('singup/responsible')
    async singUp(@Body() createResponsible: CreateResponsibleDto, @Body('address') createAddress: CreateAddressDto){
        const responsible = await this.service.createResponsible(createAddress, createResponsible);

        if(responsible == null){
            throw new HttpException(`Informação inválida! CPF já foi utilizado em outra conta.`, HttpStatus.CONFLICT)
        }
        
        return {
            message: 'Cadastro realizado.',
            id_responsible: responsible.id_responsible
            
          }
    }

    @Post('singup/elder')
    async singUpElder( @Body() createElder: CreateElderDto, @Body('address') createAddress: CreateAddressDto, @Body('responsible') responsible: number){
        const elder = await this.service.createElder(createAddress, createElder, responsible);

        if(elder == null){
            throw new HttpException(`Informação inválida! CPF já foi utilizado em outra conta.`, HttpStatus.CONFLICT)
        }

        if(elder == "responsible"){
            throw new HttpException(`Informação inválida! Seu dependente não foi encontrado em nosso Banco de Dados.`, HttpStatus.BAD_REQUEST)
        }
        
        return {
            message: 'Cadastro realizado.',
          }
    }

    @Post('/signin')
    async signIn(@Body() credentialsDto: CredentialResponsibleDto) {
      return await this.service.signIn(credentialsDto);
    }
}