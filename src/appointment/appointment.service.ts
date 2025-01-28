import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dtos/create.dto';
import { AppointmentRepository } from './repositories/mysql/appointment.repository';
import { Appointment } from '@prisma/client';
import { RedisMemory } from '@jeloulatam/memory';

@Injectable()
export class AppointmentService {
  constructor(private appointmentRepository: AppointmentRepository, @Inject("MEMORY") private readonly memory: RedisMemory) {}

  public validateScheduleAppointment(appointmentData: CreateAppointmentDto) {
    const startTime = new Date(appointmentData.startTime);
    const endTime = new Date(appointmentData.endTime);
    if (endTime <= startTime) {
      throw new Error("appointment's endTime should be after startTime");
    }
    if (this.endTimeIsInTheNextDay({...appointmentData, startTime, endTime})) {
      throw new Error("appointment's endTime should be in the same day as start time's");
    }
    return;
  }

  public createAppointment(patientId: number, createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    this.validateScheduleAppointment(createAppointmentDto);
    return this.appointmentRepository.create({
      ...createAppointmentDto,
      patientId,
    });
  }

  private endTimeIsInTheNextDay(appointmentData: CreateAppointmentDto): boolean {
    const differentDays = appointmentData.endTime.getUTCDate() !== appointmentData.startTime.getUTCDate();
    const differentMonths = appointmentData.endTime.getUTCMonth() !== appointmentData.startTime.getUTCMonth();
    const differentYears = appointmentData.endTime.getUTCFullYear() !== appointmentData.startTime.getUTCFullYear();
    return differentDays || differentMonths || differentYears;
  }
}
