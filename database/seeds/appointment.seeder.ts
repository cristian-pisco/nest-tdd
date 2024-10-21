import { Seeder } from "./seeder.interface";
import { AppointmentFactory } from "database/factories/appointment.factory";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AppointmentSeeder implements Seeder {
    async run(): Promise<void> {
        const patients = await prisma.patient.findMany();
        for (let index = 0; index < 10; index++) {
            const randomIndex = Math.floor(Math.random() * patients.length);
            const randomPatient = patients[randomIndex];
            await AppointmentFactory.create(randomPatient.id);
        }
    }
}
