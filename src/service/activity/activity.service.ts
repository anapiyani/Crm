import {
  IAppointmentMaterials,
  IClientBalance,
  ICreateNotification,
  INotificationGet,
  IPaymentConfirm,
  IReviewFeedback,
  IViewVistInfo,
  IVisitsInfo,
  IVisitsResponse,
} from "@/ts/activity.interface";
import api from "../api";

export const searchVisits = (
  formData: IVisitsInfo
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

export const feedback = (form: FormData): Promise<any> => {
  return api
    .post("/appointments/appointments/review/", form)
    .then((res) => res.data);
};

export const report = (form: FormData): Promise<any> => {
  return api
    .post("/appointments/appointments/complaints/", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const confirmPayment = ({
  id,
  paymentConfirm,
}: {
  id: string;
  paymentConfirm: IPaymentConfirm;
}): Promise<any> => {
  return api
    .post(`/appointments/appointments/${id}/confirm-payment/`, paymentConfirm)
    .then((res) => res.data);
};

export const getBalance = (id: string): Promise<IClientBalance> => {
  return api.get(`/deposit/${id}/`).then((res) => res.data);
};

export const cancelPayment = (id: string): Promise<{ message: string }> => {
  return api.post(`/cancel_payment/${id}/`).then((res) => res.data);
};

export const addMaterialsForVisit = ({
  appointment_id,
  appointment_materials,
}: {
  appointment_id: number;
  appointment_materials: IAppointmentMaterials;
}): Promise<unknown> => {
  return api
    .put(
      `/appointments/appointments/${appointment_id}/add-materials/`,
      appointment_materials
    )
    .then((res) => res.data);
};

export const createNotification = (form: ICreateNotification): Promise<any> => {
  return api.post("/reminder/", form).then((res) => res.data);
};

export const searchNotifications = (
  formData: INotificationGet
): Promise<any> => {
  const params = new URLSearchParams();

  Object.entries(formData).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        params.append(key, item.toString());
      });
    } else if (value) {
      params.append(key, value.toString());
    }
  });

  const url = `/reminder/?${params.toString()}`;
  return api.get(url).then((res) => res.data);
};
