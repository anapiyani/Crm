export interface IMaterial {
  material: number;
  quantity_used: string;
  price: string;
}

export interface IMaterialPurchases {
  material: number;
  quantity: string;
  price: string;
}

export interface IAppointmentService {
  service: number;
  price?: string;
  quantity: number;
  materials: IMaterial[];
  parameter_id: number;
}

export interface IAppointmentCreateForm {
  client_id: number;
  employee_id: number;
  status?: string;
  dates: string[];
  start_times: string[];
  end_times: string[];
  discount_custom?: string;
  notes?: string;
  type: string;
  appointment_services: IAppointmentService[];
  material_purchases: IMaterialPurchases[];
}

export interface IAppointmentReturn
  extends Omit<
    IAppointmentCreateForm,
    "appointment_services" | "material_purchases"
  > {
  id: number;
  created_at: string;
  updated_at: string;
  total_price: string;
  appointment_services: Array<
    {
      id: number;
      service_name: string;
      total_price: string;
      materials: Array<{
        id: number;
        material_name: string;
        total_price: string;
      }>;
    } & IAppointmentService
  >;
  material_purchases: Array<
    {
      id: number;
      material_name: string;
    } & IMaterialPurchases
  >;
}

interface IClient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface ISingleAppointmentReturn {
  id: number;
  client: IClient;
  status: string;
  discount_custom: string | null;
  notes: string;
  type: string;
  appointment_services: Array<{
    id: number;
    service: number;
    service_name: string;
    price: string;
    quantity: number;
    parameter: string;
  }>;
  material_purchases: Array<{
    id: number;
    material: number;
    material_name: string;
    quantity: string;
    price: string;
  }>;
  total_price: string;
  created_at: string;
  updated_at: string;
  date: string;
  start_time: string;
  end_time: string;
  employee_id: number;
  employee_name: string;
}

export interface IAppointmentHistory {
  id: number;
  client_name: string;
  employee_name: string;
  status: string;
  department: string;
  date: string;
  start_time: string;
  end_time: string;
  services: Array<{
    id: number;
    service_name: string;
    parameter: string;
    price: string;
    quantity: number;
    total_price: string;
  }>;
  discount_custom: string;
  total_price: string;
}

export interface IDeletedAppointment {
  id: number;
  client: IClient;
  written_by: {
    [key: string]: string;
  };
  status: string;
  discount_custom: string;
  notes: string;
  type: string;
  appointment_services: Array<{
    id: number;
    service: number;
    service_name: string;
    price: string;
    quantity: number;
    materials: Array<{
      id: number;
      material: number;
      material_name: string;
      quantity_used: string;
      price: string;
      total_price: string;
    }>;
    parameter: string;
  }>;
  material_purchases: Array<{
    id: number;
    material: number;
    material_name: string;
    quantity: string;
    price: string;
  }>;
  total_price: string;
  created_at: string;
  updated_at: string;
  employee_name: string;
  is_deleted: boolean;
  reason_deleted: string;
  date: string;
  start_time: string;
  end_time: string;
}
