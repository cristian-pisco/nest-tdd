import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { CreatePatientDto } from './dtos';
import { PatientRepository } from './repositories/mysql/patient.repository';

@Injectable()
export class PatientService {
    constructor(private patientRepository: PatientRepository) {}

    async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
        return this.patientRepository.create(createPatientDto);
    }
    //   async createPatient(name: string): Promise<Patient> {
    //     return this.prisma.patient.create({
    //       data: { name },
    //     });
    //   }
}
