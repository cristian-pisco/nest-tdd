import { Injectable } from '@nestjs/common';
import { AppointmentInput } from './interface/appointment-input.interface';

@Injectable()
export class AppointmentService {
    public scheduleAppointment(appointmentData: AppointmentInput) {
        if (appointmentData.endTime <= appointmentData.startTime) {
            throw new Error("appointment's endTime should be after startTime");
        }
        if (
            this.endTimeIsInTheNextDay(appointmentData)
        ) {
            throw new Error(
                "appointment's endTime should be in the same day as start time's",
            );
        }
        return {
          ...appointmentData,
          confirmed: false,
        };
    }

    private endTimeIsInTheNextDay(appointmentData: AppointmentInput): boolean {
        const differentDays =
          appointmentData.endTime.getUTCDate() !==
          appointmentData.startTime.getUTCDate();
        const differentMonths =
          appointmentData.endTime.getUTCMonth() !==
          appointmentData.startTime.getUTCMonth();
        const differentYears =
          appointmentData.endTime.getUTCFullYear() !==
          appointmentData.startTime.getUTCFullYear();
        return differentDays || differentMonths || differentYears;
    }
}
