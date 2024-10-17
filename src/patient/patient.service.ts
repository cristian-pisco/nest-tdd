import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { PrismaService } from '@dbservice/prisma.service';

@Injectable()
export class PatientService {
    constructor(private prisma: PrismaService) {}

  async createPatient(name: string): Promise<Patient> {
    return this.prisma.patient.create({
      data: { name },
    });
  }
}
