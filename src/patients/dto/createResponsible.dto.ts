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