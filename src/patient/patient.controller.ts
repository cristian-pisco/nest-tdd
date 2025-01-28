import { Body, Controller, Get, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dtos';

@Controller({
  version: "1",
})
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
  }
}
