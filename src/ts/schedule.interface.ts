export interface IEmployee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  gender: string;
  date_of_birth: string;
  phone_number: string;
  phone_number_whatsapp: string;
}

export interface IBreaks {
  id: number;
  employee: number;
  start_time: string;
  end_time: string;
  break_note: string;
  date: string;
}

export interface ILongBreaks {
  employee_id: number;
  date_from: string;
  date_to: string;
  day_status_id: number;
  replacement_employee_id?: number;
}

export interface IAppointment {
  id: number;
  client: number;
  employee: number;
  status: string;
  date: string;
  start_time: string;
  end_time: string;
  discount_custom: number | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ISchedule {
  id: number;
  employee: IEmployee;
  date: string;
  day_status: {
    id: number;
    status: string;
  };
  notes: string;
  breaks: IBreaks[];
  appointments: IAppointment[];
}

export interface IResponseScheduleData {
  notes: string | null;
  id: number;
  employee: IEmployee;
  date: string;
  day_status: {
    id: number;
    status: string;
  };
  breaks: IBreaks[];
  appointments: IAppointment[];
  start_time: string;
  end_time: string;
}

export interface IResponseScheduleDataCounts {
  results: IResponseScheduleData[];
  count: number;
}

export interface IYearlySchedule {
  date: string;
  day_status: {
    id: number;
    status:
      | "working_day"
      | "holiday"
      | "sick_leave"
      | "time_off"
      | "learning"
      | "vacation";
  };
}

export interface IScheduleEmployeeChange {
  date: string;
  employeeId: number;
  end_time: string;
  start_time: string;
}
