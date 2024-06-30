import { Type } from "class-transformer";
import { IsEmail, IsOptional, IsPhoneNumber, IsString, Matches, MinLength, ValidateNested } from "class-validator";
import { UpdateAddressDto } from "src/address/dto/updateAddress.dto";

export class UpdateCaregiverDTO {
    @IsString()
    @IsOptional()
    photo: string;

    @IsString()
    @IsPhoneNumber('BR')
    @IsOptional()
    phone: string;

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