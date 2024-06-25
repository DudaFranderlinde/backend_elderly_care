import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { PatientService } from "../service/patients.service";
import { CreateElderDto } from "../dto/createElder.dto";
import { CreateResponsibleDto } from "../dto/createResponsible.dto";
import { CreateAddressDto } from "src/utils/dto/createAddress.dto";
import { CredentialResponsibleDto } from "../dto/credentialResponsible.dto";
import { JwtAuthGuard } from "src/core/auth/guard/jwt-auth.guard";

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


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async me(@Request() req, @Res() response: Response) {
        try {            
          const user = await this.service.getProfile(+req.user.id)
         
          if (user) {
            response.status(HttpStatus.OK).send(user)
            return user
          }
  
          response.status(HttpStatus.BAD_REQUEST).send(`message:{Nenhum usuário encontrado com o ID ${+req.user.id}}`)
        } catch (error) {
          throw new HttpException({ reason: error?.detail }, HttpStatus.BAD_REQUEST)
        }      
      } 
}
