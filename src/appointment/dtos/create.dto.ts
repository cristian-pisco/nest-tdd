import { IsDateString } from "class-validator";

export class CreateAppointmentDto {
    @IsDateString()
    startTime: Date;

    @IsDateString()
    endTime: Date;
    confirmed: boolean;
    patientId: number;
}
