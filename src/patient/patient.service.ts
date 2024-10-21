import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { CreatePatientDto, DeletePatientDto, UpdatePatientDto } from "@patient/dtos";
import { PatientRepository } from './repositories/mysql/patient.repository';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PatientService {
    constructor(private readonly httpService: HttpService, private patientRepository: PatientRepository) {}

    createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
        return this.patientRepository.create(createPatientDto);
    }
    getPatient(id: number): Promise<Patient> {
        return this.patientRepository.getById(id);
    }
    updatePatient(updatePatientDto: UpdatePatientDto): Promise<Patient> {
        return this.patientRepository.update(updatePatientDto);
    }
    deletePatient(deletePatientDto: DeletePatientDto): Promise<Patient> {
        return this.patientRepository.delete(deletePatientDto);
    }
    async callPublicApi(url: string) {
        const response = await firstValueFrom(this.httpService.get(url));
        return response.data;
    }
}
