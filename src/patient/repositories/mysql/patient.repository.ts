import { IBaseRepository } from "@core/interfaces";
import { PrismaService } from "@dbservice/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreatePatientDto, UpdatePatientDto } from "@patient/dtos";
import { Patient } from "@prisma/client";

@Injectable()
export class PatientRepository implements IBaseRepository<Patient, number, CreatePatientDto, UpdatePatientDto> {
    constructor(private readonly prisma: PrismaService) {}
    getById(id: number): Promise<Patient> {
        return this.prisma.patient.findUnique({
            where: {
                id,
            },
        })
    }
    create(item: CreatePatientDto): Promise<Patient> {
        return this.prisma.patient.create({
            data: item,
        });
    }
    update(item: UpdatePatientDto): Promise<Patient> {
        return this.prisma.patient.update({
            where: {
                id: item.id,
            },
            data: item,
        });
    }
}
