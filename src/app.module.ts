import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    PatientModule,
    AppointmentModule,
    RouterModule.register([
      {
        path: "patients",
        module: PatientModule,
        children: [
          {
            path: "/:patientId/appointments",
            module: AppointmentModule,
          }
        ]
      }
    ])
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
