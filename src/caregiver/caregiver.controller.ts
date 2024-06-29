import { Body, Controller, Get, HttpException, HttpStatus, Post, ValidationPipe, Request, Res, UseGuards, Put } from "@nestjs/common";
import { CreateCaregiverDTO } from "./dto/createCaregiver.dto";
import { CreateAddressDto } from "src/address/dto/createAddress.dto";
import { Response } from 'express';
import { CredentialCaregiverDto } from "./dto/credentialsCaregiver.dto";
import { JwtAuthGuard } from "src/core/auth/guard/jwt-auth.guard";
import { UpdateCaregiverDTO } from "./dto/updateCaregiver.dto";
import { CaregiverService } from "./caregiver.service";

@Controller('caregiver')
export class CaregiverController {
    constructor(
        private service: CaregiverService
    ){}

    @Post('/signup')
    async singUp(@Body(ValidationPipe) createCaregiver: CreateCaregiverDTO, @Body('address') createAddress: CreateAddressDto) {
      try {
        const caregiver = await this.service.createUser(createCaregiver, createAddress);

        if(caregiver == "cpf"){
            throw new HttpException(`Informação inválida! CPF já foi utilizado em outra conta.`, HttpStatus.CONFLICT)
        }

        if(caregiver == "email"){
          throw new HttpException(`Informação inválida! Email já foi utilizado em outra conta.`, HttpStatus.CONFLICT)
        }

        return {
          message: 'Cadastro realizado.'
        }
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

    @Post('/signin')
    async signIn(@Body() credentialsDto: CredentialCaregiverDto) {
      return await this.service.signIn(credentialsDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
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

    @UseGuards(JwtAuthGuard)
    @Put('/update')
    async update(@Body() updateCompanyDto: UpdateCaregiverDTO, @Res() response: Response, @Request() req){
      try {
        const updated = await this.service.updateCaregiver(updateCompanyDto, req.user.id);

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

    @Get('/getAvailable')
    async All(@Res() response: Response) {
      try {
        const user = await this.service.getCaregivers()
       
        if (user) {
          response.status(HttpStatus.OK).send(user)
          return user
        }

        response.status(HttpStatus.BAD_REQUEST).send(`message:{Sem cuidadores cadastras no momento}`)
      } catch (error) {
        throw new HttpException({ reason: error?.detail }, HttpStatus.BAD_REQUEST)
      }      
    }
}