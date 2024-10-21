import { Factory } from "./factory";
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import { PatientFactory } from "./patient.factory";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AppointmentFactory extends Factory {
    definition(): Record<string, any> {
        const now = dayjs().toDate();
        const tomorrow = dayjs().add(1, 'day');
        return {
            patientId: faker.number.int(),
            startTime: now,
            endTime: tomorrow,
            confirmed: faker.datatype.boolean(),
        };
    }
    static async create(patientId?: number) {
        if (!patientId) {
            const patient = await PatientFactory.create();
            return prisma.appointment.create({
                data: {
                    patientId: patient.id,
                    startTime: dayjs().toDate(),
                    endTime: dayjs().add(1, 'day').toDate(),
                    confirmed: faker.datatype.boolean(),
                },
            });
        }
        return prisma.appointment.create({
            data: {
                patientId: patientId,
                startTime: dayjs().toDate(),
                endTime: dayjs().add(1, 'day').toDate(),
                confirmed: faker.datatype.boolean(),
            },
        });
    }
}
