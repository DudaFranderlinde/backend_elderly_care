import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProposalDto {
    @IsNumber()
    @IsNotEmpty({message: "Campo de ID de Cuidador não pode estar vazio."})
    readonly caregiver_id: number;
}