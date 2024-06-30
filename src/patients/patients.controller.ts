import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Request, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { PatientService } from "./patients.service";
import { CreateElderDto } from "./dto/createElder.dto";
import { CreateResponsibleDto } from "./dto/createResponsible.dto";
import { CreateAddressDto } from "src/address/dto/createAddress.dto";
import { CredentialResponsibleDto } from "./dto/credentialResponsible.dto";
import { JwtAuthGuard } from "src/core/auth/guard/jwt-auth.guard";
import { UpdateElderDto } from "./dto/updateElder.dto";
import { UpdateResponsibleDto } from "./dto/updateResponsible.dto";

@Controller('patients')
export class PatientsController {
    constructor(
        private service: PatientService
    ){}

    @Post('signup/responsible')
    async singUp(@Body() createResponsible: CreateResponsibleDto, @Body('address') createAddress: CreateAddressDto){
        const responsible = await this.service.createResponsible(createAddress, createResponsible);

        if(responsible == "cpf"){
            throw new HttpException(`Informação inválida! Verifique CPF já foi utilizado em outra conta.`, HttpStatus.CONFLICT)
        }

        if(responsible == "email"){
          throw new HttpException(`Informação inválida! Verifique Email já foi utilizado em outra conta.`, HttpStatus.CONFLICT)
        }

        if(responsible == "idade"){
          throw new HttpException(`Informação inválida! Menor de idade não é permitido ser declarado como resposável.`, HttpStatus.CONFLICT)
        }
        
        return {
            message: 'Cadastro realizado.',
            id_responsible: responsible
            
          }
    }

    @Post('signup/elder')
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

    @Put('update/elder')
    async updateElder(@Body() updateCompanyDto: UpdateElderDto, @Body('id_elder') id, @Res() response: Response,){
      try {
        console.log(14);
        
        const updated = await this.service.updateElder(updateCompanyDto, id);
  
        response.status(HttpStatus.OK).send(updated);
      } catch (error) {
        if (typeof error === 'object') {
          throw new HttpException(
            { statusCode: HttpStatus.NOT_FOUND, message: error.message },
            HttpStatus.NOT_FOUND,
          );
        }
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      }
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/responsible')
    async updateResponsible(@Body() updateCompanyDto: UpdateResponsibleDto, @Res() response: Response, @Request() req){
      try {    
        const updated = await this.service.update(updateCompanyDto, req.user.id);
  
        if(updated == "email"){
          throw new HttpException(`Informação inválida! Email já foi utilizado em outra conta.`, HttpStatus.CONFLICT)
        }

        response.status(HttpStatus.OK).send(updated);
      } catch (error) {
        if (typeof error === 'object') {
          throw new HttpException(
            { statusCode: HttpStatus.NOT_FOUND, message: error.message },
            HttpStatus.NOT_FOUND,
          );
        }
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      }
    }

    @UseGuards(JwtAuthGuard)
    @Get('myElder')
    async elders(@Request() req, @Res() response: Response) {
      try {  
        const user = await this.service.getElder(req.user.id)
       
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
