import { IResponseData } from "@/ts/types";
import api from "../api";
import {
  IAppointmentCreateForm,
  IAppointmentHistory,
  IAppointmentReturn,
  IDeletedAppointment,
  IServicesAdd,
  ISingleAppointmentReturn,
} from "@/ts/appointments.interface";
import { IServicesChoose } from "@/ts/activity.interface";

export const createAppointments = (
  data: IAppointmentCreateForm,
): Promise<IAppointmentReturn> => {
  return api.post("/appointments/appointments/", data).then((res) => res.data);
};

export const getAppointmentById = (
  id: number,
): Promise<ISingleAppointmentReturn> => {
  return api.get(`/appointments/appointments/${id}/`).then((res) => res.data);
};

export const getCustomerAppointmentHistoryById = (
  customer_id: number,
): Promise<IAppointmentHistory[]> => {
  return api
    .get(`/appointments/appointments/history/${customer_id}/`)
    .then((res) => {
      return res.data;
    });
};

export const getCustomerAppointmentNoShowById = (
  customer_id: number,
): Promise<IAppointmentHistory[]> => {
  return api
    .get(`/appointments/appointments/no-show/${customer_id}/`)
    .then((res) => res.data);
};

export const getCustomerAppointmentPlannedById = (
  customer_id: number,
): Promise<IAppointmentHistory[]> => {
  return api
    .get(`/appointments/appointments/planned/${customer_id}/`)
    .then((res) => res.data);
};

export const temporaryDeleteAppointment = ({
  id,
  is_deleted,
  reason_deleted,
}: {
  id: number;
  is_deleted: boolean;
  reason_deleted: null | string;
}) => {
  const formData = new FormData();

  formData.append("is_deleted", String(is_deleted));
  formData.append("reason_deleted", reason_deleted || "");

  return api.put(`/appointments/appointments_change/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCustomerDeletedAppointments = (
  customer_id: number,
): Promise<IAppointmentHistory[]> => {
  return api
    .get(`/appointments/appointments/is-deleted/${customer_id}/`)
    .then((res) => res.data);
};

export const updateAppointmentStatus = ({
  appointment_id,
  status,
}: {
  appointment_id: number;
  status: string;
}) => {
  return api
    .post(`/appointments/appointments/${appointment_id}/update-status/`, {
      status,
    })
    .then((res) => res.data);
};

export const getAllDeletedAppointments = (
  page?: number,
): Promise<IDeletedAppointment[]> => {
  const params = new URLSearchParams();
  if (page) {
    params.append("page", page.toString());
  }
  return api
    .get(`/appointments/appointments/deleted-apppointments-all/?${params}`)
    .then((res) => res.data);
};

// service add for appointment. ID and services
export const addServiceForAppointment = ({
  id,
  services,
}: {
  id: string;
  services: IServicesAdd;
}): Promise<any> => {
  return api
    .put(`/appointments/appointments/${id}/edit/`, services)
    .then((res) => res.data);
};
