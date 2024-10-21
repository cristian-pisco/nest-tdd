import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PrismaService } from '@dbservice/prisma.service';
import { PatientRepository } from './repositories/mysql/patient.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PatientController],
  providers: [PatientService, PrismaService, PatientRepository, HttpModule],
  exports: [PatientService],
})
export class PatientModule {}
