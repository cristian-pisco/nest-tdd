import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { CreatePatientDto, UpdatePatientDto } from './dtos';
import { PatientRepository } from './repositories/mysql/patient.repository';

@Injectable()
export class PatientService {
    constructor(private patientRepository: PatientRepository) {}

    async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
        return this.patientRepository.create(createPatientDto);
    }
    async getPatient(id: number): Promise<Patient> {
        return this.patientRepository.getById(id);
    }
    async updatePatient(updatePatientDto: UpdatePatientDto) {
        return this.patientRepository.update(updatePatientDto);
    }
    //   async createPatient(name: string): Promise<Patient> {
    //     return this.prisma.patient.create({
    //       data: { name },
    //     });
    //   }
}
