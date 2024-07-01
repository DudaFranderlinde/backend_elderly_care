import { Module } from "@nestjs/common";
import { patientsProviders } from "./patients.providers";
import { databaseProviders } from "src/core/database/database.providers";
import { PatientService } from "./patients.service";
import { PatientsController } from "./patients.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthService } from "src/core/auth/service/auth.service";

@Module({
    imports: [JwtModule],
    controllers: [PatientsController],
    providers: [...patientsProviders, ...databaseProviders, PatientService, JwtService, AuthService],
})
export class PatientsModule {}