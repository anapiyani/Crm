export type ISearchFormData = {
  search: string;
  phoneNumber: string;
  userId: string;
  email: string;
  isActive: boolean | null;
  employmentDateFrom: string;
  employmentDateTo: string;
  birthDateFrom: string;
  birthDateTo: string;
  ageFrom: string;
  ageTo: string;
  gender: "male" | "female" | "";
  role: string;
  roleEmployee: string;
  reviewFrom: string;
  reviewAbout: string;
  reviewDateFrom: string;
  reviewDateTo: string;
  page: number;
  page_size: number;
};

export interface IUserDetails {
  user_id: number;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  gender: string;
  date_of_birth: string;
  phone_number: string;
  phone_number_whatsapp: string;
  position: string;
  start_date: string;
  city: string;
  city_index: string;
  street: string;
  house: string;
  apartment: string;
  comment: string;
  is_active?: boolean;
}

export interface IEmployeesData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IUserDetails[];
}
export interface ICardInfoEmployee {
  id: number;
  user: number;
  appointments_count: number;
  last_appointment: string;
  revenue: string;
  services_count: number;
}

export interface IOptions {
  value: string;
  label: string;
}

export interface ITemplate {
  name: string;
  template_type: "production" | "management" | "admin";
  fixed_part: IFixedPart;
  floating_part: IFloatingPart;
  product_sales: IProductSales;
  client_attraction: IClientAttraction;
  client_development: IClientDevelopment;
  services_with_different_percentage: IServicesWithDifferentPercentage[];
  certificate_sales: ICertificateSales;
  subscription_sales: ISubscriptionSales;
  id?: number;
}

export interface IFixedPart {
  payroll_type: string;
  fixed_amount: string;
  from_amount: string;
  to_amount: string;
  from_value: string;
  to_value: string;
  id?: number;
  salary_only_for_worked_time: boolean;
}

export interface IFloatingPart {
  id?: number;
  revenue_dependent_type: string;
  calculation_method: string;
  material_cost_method: string;
  employee_percentage: string;
  own_clients_percentage: string;
  min_amount: string;
  min_amount_period: string;
  bonus_type: string;
  from_percentage: string;
  to_percentage: string;
}

export interface IProductSales {
  revenue_type: string;
  calculation_type: string;
  percentage: string;
  id?: number;
}

export interface IClientAttraction {
  // currently empty
  id?: number;
}

export interface IClientDevelopment {
  // currently empty
  id?: number;
}

export interface IServicesWithDifferentPercentage {
  service: number[];
  employee_percentage: string;
  calculation_method: string;
  fixed_amount: string;
  id?: number;
}

export interface ICertificateSales {
  calculation_type: string;
  from_percentage: string;
  to_percentage: string;
  constant_percentage: string;
  id?: number;
}

export interface ISubscriptionSales {
  calculation_type: string;
  from_percentage: string;
  to_percentage: string;
  constant_percentage: string;
  id?: number;
}
