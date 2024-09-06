export type ISearchFormData = {
  search: string;
  phone_number: string;
  whatsapp: string;
  card_number?: string;
  user_id: string;
  email: string;
  is_active: boolean | null;
  employmentDateFrom: string;
  employmentDateTo: string;
  age_from: string;
  age_to: string;
  gender: "male" | "female" | "";
  role: string;
  roleEmployee: string;
  reviewFrom: string;
  reviewAbout: string;
  reviewDateFrom: string;
  reviewDateTo: string;
  page: number;
  page_size: number;
  first_visit_from?: string;
  first_visit_to?: string;
  date_of_birth_from: string;
  date_of_birth_to: string;
  works_from: string;
  works_to: string;
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
  card_number?: string;
  category?: string;
  description?: string | null;
  description_as_main_characteristic?: boolean;
  discount_card?: string | null;
  employee?: string | null;
  first_visit?: string;
  invite_source?: string;
  occupation?: string;
  personal_discount?: string | null;
  sms_notification?: boolean;
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
  client_attraction: IClientAttraction;
  client_development: IClientDevelopment;
  services_with_different_percentage: IServicesWithDifferentPercentage[];
  products_with_different_percentage: IItemsWithDifferentPercentage[];
  item_sales: IItemSales;
  id?: number;
  isEdit?: boolean;
  employee?: number | undefined;
}

export interface IItemSales {
  certificate_sales: ICertificateSales;
  product_sales: IProductSales;
  revenue_type: string;
  subscription_sales: ISubscriptionSales;
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
  from_percentage: string;
  to_percentage: string;
  id?: number;
}

export interface IClientAttraction {
  calculation_type_client_of_master: string;
  calculation_type_referred_client: string;
  value_client_of_master: string;
  value_referred_client: string;
  id?: number;
}

export interface IClientDevelopment {
  calcualtion_type: string;
  value: string;
  id?: number;
}

export interface IServicesWithDifferentPercentage {
  service: number[];
  root: string[];
  employee_percentage: string;
  calculation_method: string;
  fixed_amount: string;
  id?: number;
}

export interface IItemsWithDifferentPercentage {
  material: number[];
  root: string[];
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
  from_value: string;
  to_value: string;
  id?: number;
}

export interface ISubscriptionSales {
  calculation_type: string;
  from_percentage: string;
  to_percentage: string;
  constant_percentage: string;
  id?: number;
}

export interface ISalaryWalletResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ISalaryWallet[];
}

export interface ISalaryWallet {
  id: number;
  wallet: number;
  description: string;
  type: string;
  revenue: string;
  material_cost: string;
  salary_change: string;
  salary_formula: string;
  date: string;
  service: number;
  appointment: number;
  client_name: string;
  appointment_name: string;
}
