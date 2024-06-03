import { Module } from "@nestjs/common";
import { patientsProviders } from "./patients.providers";
import { databaseProviders } from "src/core/database/database.providers";
import { PatientService } from "./service/patients.service";
import { PatientsController } from "./controller/patients.controller";

@Module({
    imports: [],
    controllers: [PatientsController],
    providers: [...patientsProviders, ...databaseProviders, PatientService],
})
export class PatientsModule {}