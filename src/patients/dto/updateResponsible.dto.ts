import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, ValidateNested } from "class-validator";
import { UpdateAddressDto } from "src/address/dto/updateAddress.dto";
import { Kinship } from "src/utils/enum/kinship-responsible.enum";

export class UpdateResponsibleDto {
    @IsOptional()
    @IsString()
    @IsPhoneNumber('BR')
    phone: string;

    @IsOptional()
    @IsEnum(Kinship)
    kinship: Kinship;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsString()
    pass: string;

    @ValidateNested()
    @IsOptional()
    @Type(()=> UpdateAddressDto)
    address: UpdateAddressDto;
}