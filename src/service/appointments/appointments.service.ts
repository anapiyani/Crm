import api from "../api";
import {
  IAppointmentCreateForm,
  IAppointmentReturn,
} from "@/ts/appointments.interface";

export const createAppointments = (
  data: IAppointmentCreateForm
): Promise<IAppointmentReturn> => {
  return api.post("/appointments/appointments/", data).then((res) => res.data);
};
