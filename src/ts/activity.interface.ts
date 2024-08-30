import { IMaterialPurchases } from "./appointments.interface";

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

export interface IViewAppointmentService {
  discount_service: number;
  id: number;
  materials: IMaterialPurchases[];
  parameter: string;
  price: string;
  quantity: number;
  service: number;
  service_name: string;
  summa: number;
  total_summ: number;
}
export interface IViewVistInfo {
  appointment_services: IViewAppointmentService[];
  client: IClient;
  created_at: string;
  date: string;
  discount_custom: null | number;
  employee_id: number;
  employee_name: string;
  employee_role: string;
  end_time: string;
  id: number;
  material_purchases: IMaterialPurchasesView[];
  salary_info: ISalaryInfo[];
  notes: string;
  reason_deleted: null | string;
  service_amount: number;
  start_time: string;
  status: string;
  total_card: number;
  total_cash: number;
  total_price: number;
  type: string;
  updated_at: string;
  written_by: {
    id: number;
    name: string;
  };
  do_skidki: number;
  itogo: number;
  oplacheno: number;
  skidka: number;
}

export interface ISalaryInfo {
  id: number;
  type: string;
  revenue: number;
  salary_change: number;
  salary: string;
  description: string;
  date: string;
  service: string;
}

export interface IMaterialPurchasesView {
  id: number;
  material: number;
  material_name: string;
  quantity: string;
  price: string;
}

export interface IReviewFeedback {
  scan_review?: File | null;
  scan_complaint?: File | null;
  text_review?: string;
  text_complaint?: string;
  date: string;
  time: string;
  status: string;
  appointment?: number | null;
  user: number;
}

export interface IPaymentConfirm {
  payments: IPayment[];
  comment: string;
  discount_custom: number;
  on_deposit: boolean;
}

export interface IPayment {
  money_type: string;
  amount: number;
}

export interface IClientBalance {
  balance: string;
  user: number;
  date_updated: string;
}
