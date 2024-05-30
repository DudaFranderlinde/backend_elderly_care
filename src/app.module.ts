import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './core/auth/guard/jwt-strategy';
import { CaregiverEntity } from './caregiver/entities/caregiver.entity';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '6h',
      },
    }),
    CaregiverEntity,
    PatientsModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
