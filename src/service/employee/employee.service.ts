import { IEmployeeAddForm } from "@/ts/types";
import api from "../api";
import { IDepartments } from "@/ts/employee.interface";

interface IUserDetails {
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

export interface IAddEmployeeInterface {
  id: number;
  user: IUserDetails;
  position: string;
  start_date: string;
  city: string;
  city_index: string;
  street: string;
  house: string;
  apartment: string;
  comment: string;
}

export const addEmployee = (
  form: IEmployeeAddForm
): Promise<IAddEmployeeInterface> => {
  return api.post("/users/register-employee/", form).then((res) => res.data);
};

export const searchDepartment = (): Promise<IDepartments> => {
  return api.get("/hierarchy/hierarchy-departments/").then((res) => res.data);
};
