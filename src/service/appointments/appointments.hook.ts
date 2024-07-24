import {
  IAppointmentCreateForm,
  IAppointmentReturn,
} from "@/ts/appointments.interface";
import { createAppointments } from "./appointments.service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateAppointment = () => {
  return useMutation<IAppointmentCreateForm, Error, IAppointmentReturn>({
    mutationFn: createAppointments,
    onSuccess: (data) => {
      toast.success("Запись успешно добавлена!");
      return data;
    },
    onError: (error) => {
      const errorMessage =
        "Произошла ошибка при добавлении записи." || error.message;
      toast.error(errorMessage);
    },
  });
};
