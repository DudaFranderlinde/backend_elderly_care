import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "src/address/dto/createAddress.dto";
import { UpdateAddressDto } from "../../address/dto/updateAddress.dto";

export class UpdateElderDto {
    // @IsNumber()
    // id_elder: number;

    @IsString()
    @IsOptional()
    ministration: string;

    @IsString()
    @IsOptional()
    historic: string;

    @ValidateNested()
    @IsOptional()
    @Type(()=> UpdateAddressDto)
    address: UpdateAddressDto;
}