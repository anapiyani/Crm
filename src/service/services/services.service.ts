import {
  IService,
  IServiceCalculation,
  IServiceParameters,
  IServicePriceCurrent,
  IServicePrices,
  IServicePriceTree,
  IUserService,
} from "@/ts/service.interface";
import api from "../api";
import { IResponseData } from "@/ts/types";
import { IServiceParent } from "@/ts/hierarchy.inteface";

export const getServiceById = (id: number): Promise<IService> => {
  return api.get(`/services/services/${id}/`).then((res) => res.data);
};

export const getServices = (): Promise<IResponseData<IService[]>> => {
  return api.get(`/services/services/`).then((res) => res.data);
};

export const getServiceParametersById = (
  service_id: number
): Promise<IServiceParameters[]> => {
  return api
    .get(`/services/service-parameters/service/${service_id}/`)
    .then((res) => res.data);
};

export const getServiceForEmployeeById = (
  user_id: string | undefined
): Promise<IUserService[]> => {
  return api
    .get(`/services/services/employee/${user_id}/`)
    .then((res) => res.data);
};

export const getServiceParent = (
  service_id: number
): Promise<IServiceParent[]> => {
  return api
    .get(`/hierarchy/hierarchy-parents/${service_id}/`)
    .then((res) => res.data);
};

export const getServicePrices = (
  service_id: number
): Promise<IServicePrices> => {
  return api
    .get(`/services/services-prices/${service_id}`)
    .then((res) => res.data);
};

export const getCalculations = (
  service_id: number
): Promise<IServiceCalculation[]> => {
  return api
    .get(`/percentage-position-employee/${service_id}`)
    .then((res) => res.data);
};

export const deleteAllBreaks = (
  date: string,
  employee_id: string
): Promise<void> => {
  return api
    .delete(`/schedule/breaks/delete/?date=${date}&employee_id=${employee_id}`)
    .then((res) => res.data);
};

export const getServicePriceCurant = (
  department: number,
  category?: number,
  section?: number,
  subcategory?: number,
  role?: string
): Promise<IServicePriceTree[]> => {
  const params = new URLSearchParams();
  if (category) params.append("category", category.toString());
  params.append("department", department.toString());
  if (section) params.append("section", section.toString());
  if (subcategory) params.append("subcategory", subcategory.toString());
  if (role) params.append("role", role.toString());

  const url = `/services/services-price-curant/?${params.toString()}`;
  return api.get(url).then((res) => res.data);
};
