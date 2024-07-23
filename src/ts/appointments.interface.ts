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
  price: string;
  quantity: number;
  materials: IMaterial[];
}

export interface IAppointmentCreateForm {
  client: number;
  employee: number;
  status: string;
  date: string;
  start_time: string;
  end_time: string;
  discount_custom: string;
  notes: string;
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