import { Body, Controller, HttpException, HttpStatus, Post, ValidationPipe } from "@nestjs/common";
import { CaregiverService } from "../service/caregiver.service";
import { CreateCaregiverDTO } from "../dto/createCaregiver.dto";
import { CreateAddressDto } from "src/utils/dto/createAddress.dto";

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
}