import { PatientFactory } from "database/factories/patient.factory";
import { Seeder } from "./seeder.interface";

export class PatientSeeder implements Seeder {
    async run(): Promise<void> {
        for (let index = 0; index < 10; index++) {
            await PatientFactory.create();
        }
    }
}
