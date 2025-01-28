import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { AppointmentRepository } from './repositories/mysql/appointment.repository';
import { PrismaService } from '@dbservice/prisma.service';
import { RedisProvider } from '@/providers/redis.provider';
@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository, PrismaService, RedisProvider],
})
export class AppointmentModule {}
