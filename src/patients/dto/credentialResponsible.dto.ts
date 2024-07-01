import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CredentialResponsibleDto{
    @IsString()
    @IsEmail()
    @IsNotEmpty({message: "Campo de Email não pode estar vazio."})
    readonly email: string;

    @IsString()
    @IsNotEmpty({message: "Campo de Senha não pode estar vazio."})
    @MinLength(8)
    readonly password: string;
}