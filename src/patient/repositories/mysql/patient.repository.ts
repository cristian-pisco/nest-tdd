import { IBaseRepository } from "@core/interfaces";
import { CreatePatientDto, UpdatePatientDto } from "@patient/dtos";
import { Patient } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";

export class PatientRepository implements IBaseRepository<Patient, number, CreatePatientDto, UpdatePatientDto> {
    constructor(private readonly prisma: PrismaService) {}
    getById(id: number): Promise<Patient> {
        throw new Error("Method not implemented.");
    }
    create(item: CreatePatientDto): Promise<Patient> {
        throw new Error("Method not implemented.");
    }
    update(item: UpdatePatientDto): Promise<Patient> {
        throw new Error("Method not implemented.");
    }
}
