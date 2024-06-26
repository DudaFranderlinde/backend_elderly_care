import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength, ValidateNested } from "class-validator";
import { UpdateAddressDto } from "src/utils/dto/updateAddress.dto";

export class UpdateCaregiverDTO {
    @IsString()
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    @MinLength(8)
    password: string;

    @IsString()
    @IsOptional()
    @Matches(/(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))/,
    {message: "Campo deve seguir padrão dd/mm/yyyy"})
    date_birth: string;

    @IsString()
    @IsOptional()
    experience: string;

    @IsString()
    @IsOptional()
    description_experience: string;

    @IsString()
    @IsOptional()
    training_time: string;
 
    @ValidateNested()
    @Type(()=> UpdateAddressDto)
    @IsOptional()
    address: UpdateAddressDto;
}