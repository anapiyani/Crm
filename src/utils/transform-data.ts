import { ISchedule } from "@/ts/schedule.interface";

interface IResponseData<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}

interface IAppointmentReturn {
  id: number;
  title: string;
  start: string;
  end: string;
  resourceId: number;
  phoneNumber: string;
  extendedProps: {
    type: string;
    status: string;
  };
}

interface IBreakReturn {
  id: number;
  start: string;
  end: string;
  resourceId: number;
  extendedProps: {
    type: string;
  };
}

interface IResourceReturn {
  id: number;
  title: string;
  extendedProps: {
    role: string;
  };
}

export const transformSchedulesToFullCalendar = (schedules: ISchedule[]) => {
  const events: IAppointmentReturn[] & IBreakReturn[] = [];
  const resources: IResourceReturn[] = [];
  schedules.forEach((schedule) => {
    const { breaks, appointments, employee, date } = schedule;
    resources.push({
      id: employee.id,
      title: `${employee.first_name} ${employee.last_name}`,
      extendedProps: {
        role: employee.role,
      },
    });
    appointments.forEach((appointment) => {
      events.push({
        id: appointment.id,
        title: `${schedule.employee.first_name} ${schedule.employee.last_name}`,
        start: `${date}T${appointment.start_time}`,
        end: `${date}T${appointment.end_time}`,
        resourceId: schedule.employee.id,
        phoneNumber: schedule.employee.phone_number,
        extendedProps: {
          type: "appointment",
          status: appointment.status,
        },
      });
    });
    breaks.forEach((breakItem) => {
      events.push({
        id: breakItem.id,
        start: `${date}T${breakItem.start_time}`,
        end: `${date}T${breakItem.end_time}`,
        resourceId: schedule.employee.id,
        extendedProps: {
          type: "break",
        },
      });
    });
  });
  // const events = schedules
  //   .map((schedule) => {
  //     return schedule.appointments.map((appointment) => ({
  //       id: appointment.id,
  //       title: `${schedule.employee.first_name} ${schedule.employee.last_name}`,
  //       start: `${appointment.date}T${appointment.start_time}`,
  //       end: `${appointment.date}T${appointment.end_time}`,
  //       resourceId: schedule.employee.id,
  //       phoneNumber: schedule.employee.phone_number,
  //       status: appointment.status,
  //     }));
  //   })
  //   .flat();

  // const resources = schedules.map((schedule) => ({
  //   id: schedule.employee.id,
  //   title: `${schedule.employee.first_name} ${schedule.employee.last_name}`,
  //   role: schedule.employee.role,
  // }));

  return { events, resources };
};
