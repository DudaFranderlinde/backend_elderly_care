import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './core/auth/guard/jwt-strategy';
import { PatientsModule } from './patients/patients.module';
import { CaregiverModule } from './caregiver/caregiver.module';
import { databaseProviders } from './core/database/database.providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '6h',
      },
    }),
    CaregiverModule,
    PatientsModule,
  ],
  controllers: [],
  providers: [...databaseProviders, JwtStrategy],
})
export class AppModule {}
