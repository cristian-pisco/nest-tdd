import { Factory } from "./factory";
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PatientFactory extends Factory {
    definition(): Record<string, any> {
        return {
            name: faker.person.fullName(),
        };
    }
    static create() {
        return prisma.patient.create({
            data: {
                name: faker.person.fullName(),
            },
        });
    }
}
