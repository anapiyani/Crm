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
  appointments: [];
}
