import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { CreatePatientDto, DeletePatientDto, UpdatePatientDto } from "@patient/dtos";
import { PatientRepository } from './repositories/mysql/patient.repository';

@Injectable()
export class PatientService {
    constructor(private patientRepository: PatientRepository) {}

    createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
        return this.patientRepository.create(createPatientDto);
    }
    getPatient(id: number): Promise<Patient> {
        return this.patientRepository.getById(id);
    }
    updatePatient(updatePatientDto: UpdatePatientDto): Promise<Patient> {
        return this.patientRepository.update(updatePatientDto);
    }
    async deletePatient(deletePatientDto: DeletePatientDto) {
        return this.patientRepository.delete(deletePatientDto);
    }
}
