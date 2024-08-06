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

// Für nur eine StepForm Komponente
// hier für react hook form funktioniert es nicht
export interface IStepFormHook {
  // template:
  name: string;
  type: string;
  // fixed part:
  fixed_components: IFixedComponents[];
  // floating part:
  floating_components: IFloatingComponents[];
  // selling goods:
  product_sales_components: ProductSalesComponents[];
  // attracting clients:

  // customer development:
}

export interface ITemplateList {
  id: number;
  name: string;
  type: "production" | "management" | "admin";
  fixed_components: IFixedComponents[];
  floating_components: IFloatingComponents[];
  product_sales_components: ProductSalesComponents[];
}

export interface IFixedComponents {
  id?: number;
  salary_template?: number;
  accrual_type: string;
  fixed_amount: string;
}

export interface IFloatingComponents {
  accrual_type: string;
  amount_to_pay: string;
  floating_components_by_services?: IFloatingComponentsByServices[];
  percent_amount: string;
}

export interface ProductSalesComponents {
  accural_system: string;
  percent_amount: string;
  id?: number;
  salary_template?: number;
}
export interface IFloatingComponentsByServices {
  percent_amount: string;
  services: number[];
  type: string;
}
