import { ISchedule } from "@/ts/schedule.interface";
import dayjs from "dayjs";

interface IResponseData<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}

interface IAppointmentReturn {
  id: string;
  title: string;
  start: string;
  end: string;
  resourceId: string;
  phoneNumber: string;
  extendedProps: {
    type: string;
    status: string;
    date: string;
    employeeId?: number;
  };
}

interface IBreakReturn {
  id: string;
  start: string;
  end: string;
  resourceId: string;
  break_note: string;
  extendedProps: {
    type: string;
    date: string;
    employeeId?: number;
  };
}

interface IResourceReturn {
  id: string;
  title: string;
  extendedProps: {
    role: string;
    date: string;
    employeeId?: number;
    working?: boolean;
  };
  eventColor?: string;
}

export const transformSchedulesToFullCalendar = (schedules: ISchedule[]) => {
  const events: IAppointmentReturn[] & IBreakReturn[] = [];
  const resources: IResourceReturn[] = [];
  schedules.forEach((schedule) => {
    const { breaks, appointments, employee, date, day_status } = schedule;
    const isWorkingDay = day_status.status === "working_day";
    const resourceId = `${employee.id}-${date}`;
    resources.push({
      id: resourceId,
      title: `${employee.first_name} ${employee.last_name}`,
      extendedProps: {
        role: employee.role,
        employeeId: employee.id,
        working: day_status.status === "working_day",
        date: date,
      },
      eventColor: isWorkingDay ? undefined : "#DDE7EE",
    });
    appointments.forEach((appointment) => {
      events.push({
        id: `${appointment.id}`,
        title: `${schedule.employee.first_name} ${schedule.employee.last_name}`,
        start: `${date}T${appointment.start_time}`,
        end: `${date}T${appointment.end_time}`,
        resourceId: resourceId,
        phoneNumber: schedule.employee.phone_number,
        extendedProps: {
          type: "appointment",
          status: appointment.status,
          employeeId: employee.id,
          date: date,
        },
      });
    });
    breaks.forEach((breakItem) => {
      events.push({
        id: `${breakItem.id}`,
        start: `${date}T${breakItem.start_time}`,
        end: `${date}T${breakItem.end_time}`,
        resourceId: resourceId,
        break_note: breakItem.break_note,
        extendedProps: {
          type: "break",
          date: date,
          employeeId: employee.id,
        },
      });
    });
  });

  return { events, resources };
};

export const transformMonthlySchedulesToFullCalendar = (
  schedules: ISchedule[],
  date: dayjs.Dayjs
) => {
  const events: IAppointmentReturn[] & IBreakReturn[] = [];
  const resources: IResourceReturn[] = [];
  const startOfMonth = dayjs(date).startOf("month");
  const endOfMonth = dayjs(date).endOf("month");
  const daysInMonth = endOfMonth.date();

  const workingDaysMap = new Map<string, ISchedule>();

  schedules.forEach((schedule) => {
    workingDaysMap.set(schedule.date, schedule);
  });

  for (let i = 1; i <= daysInMonth; i++) {
    const currentDay = startOfMonth.add(i - 1, "day");
    const formattedDate = currentDay.format("YYYY-MM-DD");

    const schedule = workingDaysMap.get(formattedDate);
    const isWorkingDay =
      schedule && schedule.day_status.status === "working_day";

    resources.push({
      id: `${schedules[0].employee.id}-${formattedDate}`,
      title: `${schedules[0].employee.first_name} ${schedules[0].employee.last_name}`,
      extendedProps: {
        role: schedules[0].employee.role,
        employeeId: schedules[0].employee.id,
        working: isWorkingDay,
        date: formattedDate,
      },
      eventColor: isWorkingDay ? undefined : "#DDE7EE",
    });

    if (isWorkingDay && schedule) {
      schedule.appointments.forEach((appointment) => {
        events.push({
          id: `${appointment.id}`,
          title: `${schedule.employee.first_name} ${schedule.employee.last_name}`,
          start: `${formattedDate}T${appointment.start_time}`,
          end: `${formattedDate}T${appointment.end_time}`,
          resourceId: `${schedule.employee.id}-${formattedDate}`,
          phoneNumber: schedule.employee.phone_number,
          extendedProps: {
            type: "appointment",
            status: appointment.status,
            employeeId: schedule.employee.id,
            date: formattedDate,
          },
        });
      });

      schedule.breaks.forEach((breakItem) => {
        events.push({
          id: `${breakItem.id}`,
          start: `${formattedDate}T${breakItem.start_time}`,
          end: `${formattedDate}T${breakItem.end_time}`,
          resourceId: `${schedule.employee.id}-${formattedDate}`,
          break_note: breakItem.break_note,
          extendedProps: {
            type: "break",
            date: formattedDate,
            employeeId: schedule.employee.id,
          },
        });
      });
    }
  }

  return { events, resources };
};
