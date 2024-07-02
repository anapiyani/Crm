export enum Role {
  ADMIN = "admin",
  USER = "user",
  SUPERADMIN = "superadmin",
}

export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  phone_number: string;
  phone_number_whatsapp: string;
}

export interface IEmployeeAddForm {
  user: IUser;
  position: string;
  start_date: string;
  city: string;
  city_index: string;
  street: string;
  house: string;
  apartment: string;
  comment: string;
}
