import { Type } from "class-transformer";
import { IsNotEmpty, IsString, Matches, ValidateNested } from "class-validator";
import { CreateAddressDto } from "src/address/dto/createAddress.dto";

export class CreateElderDto {
    @IsString()
    @IsNotEmpty({message: "Campo de Nome não pode estar vazio."})
    readonly name: string;

    @IsString()
    @IsNotEmpty({message: "Campo de CPF não pode estar vazio."})
    @Matches(/[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2}/, 
    {message: "Campo deve seguir padrão XXX.XXX.XXX-XX"})
    readonly cpf: string;

    @IsString()
    @IsNotEmpty({message: "Campo de Data de Nascimento não pode estar vazio."})
    @Matches(/(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))/,
    {message: "Campo deve seguir padrão dd/mm/yyyy"})
    readonly date_birth: string;

    @IsString()
    @IsNotEmpty({message: "Campo de Cuidados não pode estar vazio."})
    readonly ministration: string;

    @IsString()
    @IsNotEmpty({message: "Campo de Histórico não pode estar vazio."})
    readonly historic: string;

    @ValidateNested()
    @Type(()=> CreateAddressDto)
    readonly address: CreateAddressDto;
}