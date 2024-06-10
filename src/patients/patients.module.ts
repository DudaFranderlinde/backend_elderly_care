import { Module } from "@nestjs/common";
import { patientsProviders } from "./patients.providers";
import { databaseProviders } from "src/core/database/database.providers";
import { PatientService } from "./service/patients.service";
import { PatientsController } from "./controller/patients.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    imports: [JwtModule],
    controllers: [PatientsController],
    providers: [...patientsProviders, ...databaseProviders, PatientService, JwtService],
})
export class PatientsModule {}