import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateStatusDto {
    @IsBoolean()
    @IsNotEmpty({message: "Campo de Status não pode estar vazio."})
    readonly status: boolean;

    @IsNumber()
    @IsNotEmpty({message: "Campo de ID não pode estar vazio."})
    readonly id_status: number;
}