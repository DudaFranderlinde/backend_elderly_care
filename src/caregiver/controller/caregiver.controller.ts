import { Body, Controller, Get, HttpException, HttpStatus, Post, ValidationPipe, Request, Res, UseGuards } from "@nestjs/common";
import { CaregiverService } from "../service/caregiver.service";
import { CreateCaregiverDTO } from "../dto/createCaregiver.dto";
import { CreateAddressDto } from "src/utils/dto/createAddress.dto";
import { Response } from 'express';
import { CredentialCaregiverDto } from "../dto/credentialsCaregiver.dto";
import { JwtAuthGuard } from "src/core/auth/guard/jwt-auth.guard";

@Controller('caregiver')
export class CaregiverController {
    constructor(
        private service: CaregiverService
    ){}

    @Post('/signup')
    async singUp(@Body(ValidationPipe) createCaregiver: CreateCaregiverDTO, @Body('address') createAddress: CreateAddressDto) {
        const caregiver = this.service.createUser(createCaregiver, createAddress);

        if(caregiver == null){
            throw new HttpException(`Informação inválida! CPF já foi utilizado em outra conta.`, HttpStatus.CONFLICT)
          }
          
          return {
            message: 'Cadastro realizado.'
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
}