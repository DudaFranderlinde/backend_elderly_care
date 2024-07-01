import { IsOptional, IsString, Matches, IsNumberString, IsNotEmpty } from "class-validator";

export class CreateAddressDto{
    @IsNotEmpty()
    @Matches(/^[0-9]{5}-[0-9]{3}$/, {message:" cep must be equal to 00000-000" })
    readonly cep: string;

    @IsNotEmpty()
    @IsString()
    readonly street: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly number: string;

    @IsNotEmpty()
    @IsString()
    readonly district: string;

    @IsNotEmpty()
    @IsString()
    readonly city: string;

    @IsNotEmpty()
    @IsString()
    readonly state: string;

    @IsOptional()
    @IsString()
    readonly complement: string | null;   
}