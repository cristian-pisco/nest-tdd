import { CreateAppointmentDto } from "@appointment/dtos/create.dto";
import { DeleteAppointmentDto } from "@appointment/dtos/delete.dto";
import { UpdateAppointmentDto } from "@appointment/dtos/update.dto";
import { IBaseRepository } from "@core/interfaces";
import { PrismaService } from "@dbservice/prisma.service";
import { Injectable } from "@nestjs/common";
import { Appointment } from "@prisma/client";

@Injectable()
export class AppointmentRepository implements IBaseRepository<Appointment, number, CreateAppointmentDto, UpdateAppointmentDto, DeleteAppointmentDto> {
    constructor(private readonly prisma: PrismaService) {}
    getById(id: number): Promise<Appointment> {
        return this.prisma.appointment.findUnique({
            where: {
                id,
            },
        })
    }
    create(item: CreateAppointmentDto): Promise<Appointment> {
        return this.prisma.appointment.create({
            data: item,
        });
    }
    update(item: UpdateAppointmentDto): Promise<Appointment> {
        return this.prisma.appointment.update({
            where: {
                id: item.id,
            },
            data: item,
        });
    }
    delete(item: DeleteAppointmentDto): Promise<Appointment> {
        return this.prisma.appointment.delete({
            where: {
                id: item.id,
            }
        });
    }
}
