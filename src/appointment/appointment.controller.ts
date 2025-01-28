import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dtos/create.dto';

@Controller({
  version: "1",
})
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Param("patientId", ParseIntPipe) patientId: number, @Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(patientId, createAppointmentDto);
  }
}
