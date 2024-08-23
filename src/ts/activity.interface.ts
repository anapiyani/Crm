export interface IVisitsInfo {
  amount_from: number;
  amount_to: number;
  bank_transfer: boolean;
  bonuses: boolean;
  certificate: boolean;
  date_from: string;
  date_to: string;
  employee_id: number[];
  id: number | string | undefined;
  service_id: number[];
  ascending_order: boolean;
  sort_by_date: boolean;
  status: string;
  subscription: boolean;
  unapproved_materials: boolean;
  unpaid: boolean;
  with_products: boolean;
  cashless_payment: boolean;
  sorting?: string;
  page_size: number;
  page: number;
}

export interface IVisitsResponse {
  count: number;
  next: string;
  previous: string;
  results: IVisitsResult[];
}

export interface IVisitsResult {
  created_at: string;
  date: string;
  discount_custom: null | number;
  employee_id: number;
  employee_name: string;
  end_time: string;
  id: number;
  material_purchases: any[];
  notes: string;
  reason_deleted: null;
  start_time: string;
  status: string;
  total_price: number;
  type: string;
  updated_at: string;
  appointment_services: IAppointmentServices[];
  client: IClient;
  employee_role: string;
  total_card: number;
  total_cash: number;
  service_amount: number;
}

export interface IAppointmentServices {
  id: number;
  parameter: string;
  price: string;
  quantity: number;
  service: number;
  service_name: string;
}

export interface IClient {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
}
