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
  position: number;
  start_date: string;
  city: string;
  city_index: string;
  street: string;
  house: string;
  apartment: string;
  comment: string;
}

export interface IRoles {
  id: number;
  name: string;
  department: number;
}

export interface IDepartment {
  id: number;
  roles: IRoles[];
  name: string;
}

export interface IRoleChange {
  id: number;
  name: string;
}

export interface IRoleCreate {
  name: string;
  department_id: number;
  id: number | null;
}

export type Room = {
  id: number;
  name: string;
  available_online: boolean;
  services: number[];
};

export type RoomsData = {
  count: number;
  items_per_page: number;
  next: string | null;
  previous: string | null;
  total_pages: number;
  results: Room[];
};

export interface IResponseData<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}
