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
}

export interface IEmployeesData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IUserDetails[];
}
