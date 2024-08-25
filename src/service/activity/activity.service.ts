import {
  IViewVistInfo,
  IVisitsInfo,
  IVisitsResponse,
} from "@/ts/activity.interface";
import api from "../api";

export const searchVisits = (
  formData: IVisitsInfo,
): Promise<IVisitsResponse> => {
  const params = new URLSearchParams();
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      params.append(key, value.toString());
    }
  });
  const url = `/appointments/appointments/filter/?${params.toString()}`;
  return api.get(url).then((res) => res.data);
};

export const getVisit = (id: string): Promise<IViewVistInfo> => {
  return api.get(`/appointments/appointments/${id}`).then((res) => res.data);
};

export const deleteVisit = (id: string): Promise<void> => {
  return api.delete(`/appointments/appointments/${id}`).then((res) => res.data);
};
