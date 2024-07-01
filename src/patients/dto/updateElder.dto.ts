import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { UpdateAddressDto } from "../../address/dto/updateAddress.dto";

export class UpdateElderDto {

    @IsString()
    @IsOptional()
    ministration: string;

    @IsString()
    @IsOptional()
    photo: string;

    @IsString()
    @IsOptional()
    historic: string;

    @ValidateNested()
    @IsOptional()
    @Type(()=> UpdateAddressDto)
    address: UpdateAddressDto;
}