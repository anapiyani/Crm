import { ISchedule } from "@/ts/schedule.interface";

interface IResponseData<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}

export const transformSchedulesToFullCalendar = (schedules: ISchedule[]) => {
  const events = schedules
    .map((schedule) => {
      return schedule.appointments.map((appointment) => ({
        id: appointment.id,
        title: `${schedule.employee.first_name} ${schedule.employee.last_name}`,
        start: `${appointment.date}T${appointment.start_time}`,
        end: `${appointment.date}T${appointment.end_time}`,
        resourceId: schedule.employee.id,
        phoneNumber: schedule.employee.phone_number,
        status: appointment.status,
      }));
    })
    .flat();

  const resources = schedules.map((schedule) => ({
    id: schedule.employee.id,
    title: `${schedule.employee.first_name} ${schedule.employee.last_name}`,
    role: schedule.employee.role,
  }));

  return { events, resources };
};
