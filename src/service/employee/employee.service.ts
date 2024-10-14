import { IEmployeeAddForm } from "@/ts/types";
import api from "../api";
import { IDepartment } from "@/ts/types";
import {
  ICardInfoEmployee,
  IEmployeesData,
  ISalaryWalletResponse,
  ISearchFormData,
  ITemplate,
  ITemplateList,
  IUserDetails,
  IUserDetailsChange,
} from "@/ts/employee.interface";
import { IClientSearch } from "@/ts/client.interface";

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

export const searchDepartment = (): Promise<IDepartment> => {
  return api.get("/hierarchy/hierarchy-departments/").then((res) => res.data);
};

export const searchEmployee = (
  formData?: Partial<ISearchFormData>
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
  user_id: number
): Promise<ICardInfoEmployee> => {
  return api.get(`/information-card/${user_id}/`).then((res) => res.data);
};

export const mainInfoEmployee = (user_id: number): Promise<IUserDetails> => {
  return api.get(`/users/${user_id}/`).then((res) => res.data);
};

export const editEmployee = ({
  user_id,
  form,
}: {
  user_id: number;
  form: Partial<IUserDetailsChange>;
}) => {
  return api
    .put(`/users/update-employee/${user_id}/`, form)
    .then((res) => res.data);
};

export const getTemplateList = (
  page?: number,
  type?: string,
  page_size?: number
): Promise<ITemplateList> => {
  const params = new URLSearchParams();
  if (page) {
    params.append("page", page.toString());
  }
  if (type) {
    params.append("type", type);
  }
  if (page_size) {
    params.append("page_size", page_size.toString());
  }
  return api
    .get(`/templates-list/?${params.toString()}`)
    .then((res) => res.data);
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
  return api.patch(`/templates/${id}/`, form).then((res) => res.data);
};

export const deleteTemplate = (id: number): Promise<void> => {
  return api.delete(`/templates/${id}/`).then((res) => res.data);
};

export const addTemplate = (form: ITemplate): Promise<ITemplate> => {
  return api.post("/templates/", form).then((res) => res.data);
};

export const getWalletHistory = (
  id: string,
  page: number
): Promise<ISalaryWalletResponse> => {
  return api
    .get(`/salary-wallet-history/?page=${page}&user_id=${id}`)
    .then((res) => res.data);
};

export const deleteWalletHistory = (id: number): Promise<void> => {
  return api.delete(`/salary-wallet-history/${id}/`).then((res) => res.data);
};

export const assignTemplate = (form: {
  user_id: number;
  template_id: number | null;
}) => {
  return api.post("/assign-template/", form).then((res) => res.data);
};

export const getEmployeeTemplate = (id: string): Promise<ITemplate> => {
  return api.get(`/templates/employee/${id}/`).then((res) => res.data);
};

export const employeeSearch = (search: string): Promise<IClientSearch[]> => {
  const params = new URLSearchParams();
  params.append("search", search);

  return api
    .get(`users/search_for_employee/?${params.toString()}`)
    .then((res) => res.data);
};
