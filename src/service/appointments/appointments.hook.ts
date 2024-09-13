import {
  IAppointmentCreateForm,
  IAppointmentReturn,
} from "@/ts/appointments.interface";
import {
  addServiceForAppointment,
  createAppointments,
  temporaryDeleteAppointment,
  updateAppointmentStatus,
} from "./appointments.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useModal } from "@ebay/nice-modal-react";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  const modal = useModal();
  return useMutation<IAppointmentReturn, Error, IAppointmentCreateForm>({
    mutationFn: createAppointments,
    onSuccess: (data) => {
      toast.success("Запись успешно добавлена!");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      modal.hide();
      return data;
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при добавлении записи.";
      toast.error(errorMessage);
    },
  });
};

export const useTemporaryDeleteAppointment = () => {
  const queryClient = useQueryClient();
  const modal = useModal();
  return useMutation({
    mutationFn: temporaryDeleteAppointment,
    onSuccess: () => {
      toast.success("Запись успешно удалена!");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      modal.hide();
    },
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: () => {
      toast.success("Статус записи успешно обновлен!");
      queryClient.invalidateQueries({
        queryKey: ["appointmentByIdData"],
      });
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при обновлении статуса записи.";
      toast.error(errorMessage);
    },
  });
};

// mutation for adding service to appointment
export const useAddServiceForAppointment = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: addServiceForAppointment,
    onSuccess: () => {
      toast.success("Услуга успешно добавлена!");
      QueryClient.invalidateQueries({ queryKey: ["visitInfo"] });
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при добавлении услуги.";
      toast.error(errorMessage);
    },
  });
};
