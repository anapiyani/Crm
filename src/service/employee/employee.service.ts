import { IEmployeeAddForm } from "@/ts/types";
import api from "../api";
import { IDepartments } from "@/ts/departments.interface";
import {
  ICardInfoEmployee,
  IEmployeesData,
  ISearchFormData,
  ITemplate,
  IUserDetails,
} from "@/ts/employee.interface";

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
  form: IEmployeeAddForm,
): Promise<IAddEmployeeInterface> => {
  return api.post("/users/register-employee/", form).then((res) => res.data);
};

export const searchDepartment = (): Promise<IDepartments> => {
  return api.get("/hierarchy/hierarchy-departments/").then((res) => res.data);
};

export const searchEmployee = (
  formData?: Partial<ISearchFormData>,
): Promise<void | IEmployeesData> => {
  const params = new URLSearchParams();
  Object.entries(formData!).forEach(([key, value]) => {
    if (value) {
      params.append(key, value.toString());
    }
  });
  const url = `/users/?${params.toString()}`;
  return api.get(url).then((res) => res.data);
};

export const cardInfoEmplpyee = (
  user_id: number,
): Promise<ICardInfoEmployee> => {
  return api.get(`/information-card/${user_id}/`).then((res) => res.data);
};

export const mainInfoEmployee = (user_id: number): Promise<IUserDetails> => {
  return api.get(`/users/${user_id}/`).then((res) => res.data);
};

export const getTemplateList = (): Promise<ITemplate[]> => {
  return api.get("/templates/").then((res) => res.data);
};

export const editTemplateGet = (id: number): Promise<ITemplate> => {
  return api.get(`/templates/${id}/`).then((res) => res.data);
};

export const editTemplatePut = ({
  form,
  id,
}: {
  form: ITemplate;
  id: number;
}): Promise<ITemplate> => {
  return api.put(`/templates/${id}/`, form).then((res) => res.data);
};

export const deleteTemplate = (id: number): Promise<void> => {
  return api.delete(`/templates/${id}/`).then((res) => res.data);
};

export const addTemplate = (form: ITemplate): Promise<ITemplate> => {
  return api.post("/templates/", form).then((res) => res.data);
};
