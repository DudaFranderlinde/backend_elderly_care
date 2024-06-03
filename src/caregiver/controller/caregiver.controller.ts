import { Body, Controller, Get, HttpException, HttpStatus, Post, ValidationPipe, Request, Res } from "@nestjs/common";
import { CaregiverService } from "../service/caregiver.service";
import { CreateCaregiverDTO } from "../dto/createCaregiver.dto";
import { CreateAddressDto } from "src/utils/dto/createAddress.dto";
import { CaregiverEntity } from "../entities/caregiver.entity";
import { Response } from 'express';

@Controller('caregiver')
export class CaregiverController {
    constructor(
        private service: CaregiverService
    ){}

    @Post('/singup')
    async singUp(@Body(ValidationPipe) createCaregiver: CreateCaregiverDTO, @Body('address') createAddress: CreateAddressDto) {
        const caregiver = this.service.createUser(createCaregiver, createAddress);

        if(caregiver == null){
            throw new HttpException(`Informação inválida! CPF já foi utilizado em outra conta.`, HttpStatus.CONFLICT)
          }
          
          return {
            message: 'Cadastro realizado.'
          }
    }

    @Get('/profile')
    async me(@Request() req, @Res() response: Response) {
      try {
        const user = await this.service.getProfile(9)
       
        if (user) {
          response.status(HttpStatus.OK).send(user)
          return user
        }

        response.status(HttpStatus.BAD_REQUEST).send(`message:{Nenhum usuário encontrado com o ID ${req.user.id}}`)
      } catch (error) {
        throw new HttpException({ reason: error?.detail }, HttpStatus.BAD_REQUEST)
      }      
    } 
}