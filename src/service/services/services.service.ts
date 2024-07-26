import {
  IService,
  IServiceParameters,
  IUserService,
} from "@/ts/service.interface";
import api from "../api";
import { IResponseData } from "@/ts/types";

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
): Promise<IResponseData<IUserService[]>> => {
  return api
    .get(`/services/services/employee/${user_id}/`)
    .then((res) => res.data);
};
