import { Module } from "@nestjs/common";
import { caregiverProviders } from "./caregiver.providers";
import { CaregiverController } from "./caregiver.controller";
import { databaseProviders } from "src/core/database/database.providers";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { CaregiverService } from "./caregiver.service";

@Module({
    imports: [JwtModule],
    controllers: [CaregiverController],
    providers: [...caregiverProviders, CaregiverService, ...databaseProviders, JwtService],
})
export class CaregiverModule {}