import api from "../api";
import {
  IAppointmentCreateForm,
  IAppointmentReturn,
  ISingleAppointmentReturn,
} from "@/ts/appointments.interface";

export const createAppointments = (
  data: IAppointmentCreateForm
): Promise<IAppointmentReturn> => {
  return api.post("/appointments/appointments/", data).then((res) => res.data);
};

export const getAppointmentById = (
  id: number
): Promise<ISingleAppointmentReturn> => {
  return api.get(`/appointments/appointments/${id}/`).then((res) => res.data);
};

export const getCustomerAppointmentHistoryById = (customer_id: number) => {
  return api
    .get(`/appointments/appointments/history/${customer_id}/`)
    .then((res) => res.data);
};

export const getCustomerAppointmentNoShowById = (customer_id: number) => {
  return api
    .get(`/appointments/appointments/no-show/${customer_id}/`)
    .then((res) => res.data);
};

export const getCustomerAppointmentPlannedById = (customer_id: number) => {
  return api
    .get(`/appointments/appointments/planned/${customer_id}/`)
    .then((res) => res.data);
};
