import {
  IAppointmentCreateForm,
  IAppointmentReturn,
} from "@/ts/appointments.interface";
import {
  createAppointments,
  temporaryDeleteAppointment,
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
        "Произошла ошибка при добавлении записи." || error.message;
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
