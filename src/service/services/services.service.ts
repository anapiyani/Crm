import {
  IService,
  IServiceParameters,
  IServicePrices,
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
  user_id: string
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

export const deleteAllBreaks = (
  date: string,
  employee_id: string
): Promise<void> => {
  return api
    .delete(`/schedule/breaks/delete/?date=${date}&employee_id=${employee_id}`)
    .then((res) => res.data);
};
