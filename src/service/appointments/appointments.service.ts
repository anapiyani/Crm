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
