import { IService, IServiceCategory } from "@/ts/types";
import api from "../api";

export const getServiceById = (id: number): Promise<IService> => {
  return api.get(`/services/services/${id}/`).then((res) => res.data);
};
