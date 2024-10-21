import { AppointmentSeeder } from "./appointment.seeder";
import { PatientSeeder } from "./patient.seeder";
import { Seeder } from "./seeder.interface";

export class DatabaseSeeder implements Seeder {
    async run(): Promise<void> {
        await new PatientSeeder().run();
        await new AppointmentSeeder().run();
    }
}
