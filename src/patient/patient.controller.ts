import { Controller, Get } from '@nestjs/common';
import { PatientService } from './patient.service';

@Controller()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
}
