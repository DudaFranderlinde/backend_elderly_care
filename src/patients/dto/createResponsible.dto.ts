import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, Matches } from "class-validator";
import { Kinship } from "src/utils/enum/kinship-responsible.enum";

export class CreateResponsibleDto {
    @IsString()
    @IsNotEmpty({message: "Campo de Nome não pode estar vazio."})
    readonly name: string;

    @IsString()
    @IsNotEmpty({message: "Campo de CPF não pode estar vazio."})
    @Matches(/[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2}/, 
    {message: "Campo deve seguir padrão XXX.XXX.XXX-XX"})
    readonly cpf: string;

    @IsString()
    @IsPhoneNumber('BR')
    @IsNotEmpty({message: "Campo de Telefone não pode estar vazio."})
    readonly phone: string;

    @IsString()
    @IsNotEmpty({message: "Campo de Foto não pode estar vazio."})
    readonly photo: string;

    @IsString()
    @IsNotEmpty({message: "Campo de Data de Nascimento não pode estar vazio."})
    @Matches(/(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))/,
    {message: "Campo deve seguir padrão dd/mm/yyyy"})
    readonly date_birth: string;

    @IsEnum(Kinship)
    @IsNotEmpty({message: "Campo de Parentesco não pode estar vazio."})
    readonly kinship: Kinship;

    @IsString()
    @IsEmail()
    @IsNotEmpty({message: "Campo de Email não pode estar vazio."})
    readonly email: string;
    
    @IsString()
    @IsNotEmpty({message: "Campo de Senha não pode estar vazio."})
    readonly pass: string;
}