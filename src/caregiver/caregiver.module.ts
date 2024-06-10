import { Module } from "@nestjs/common";
import { caregiverProviders } from "./caregiver.providers";
import { CaregiverService } from "./service/caregiver.service";
import { CaregiverController } from "./controller/caregiver.controller";
import { databaseProviders } from "src/core/database/database.providers";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    imports: [JwtModule],
    controllers: [CaregiverController],
    providers: [...caregiverProviders, CaregiverService, ...databaseProviders, JwtService],
})
export class CaregiverModule {}