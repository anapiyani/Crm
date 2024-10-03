import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  addMaterialsForVisit,
  cancelPayment,
  confirmPayment,
  createNotification,
  deleteVisit,
  feedback,
  report,
} from "./activity.service";
import {
  IAppointmentMaterials,
  ICreateNotification,
  IPaymentConfirm,
  IReviewFeedback,
} from "@/ts/activity.interface";

export const useDeleteVisit = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteVisit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitsData"] });
      window.location.href = "/visits";
      toast.success("Посещение успешно удалено.");
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при удалении посещении.";
      toast.error(errorMessage);
    },
  });
};

export const useFeedBack = () => {
  return useMutation<any, Error, FormData>({
    mutationFn: feedback,
    onSuccess: () => {
      toast.success("Отзыв успешно отправлен.");
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при отправке отзыва.";
      toast.error(errorMessage);
    },
  });
};

export const useReport = () => {
  return useMutation<any, Error, FormData>({
    mutationFn: report,
    onSuccess: () => {
      toast.success("Жалоба успешно отправлена.");
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при отправке жалобы.";
      toast.error(errorMessage);
    },
  });
};

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { id: string; paymentConfirm: IPaymentConfirm }
  >({
    mutationFn: ({ id, paymentConfirm }) => {
      return confirmPayment({ id, paymentConfirm });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["visitInfo"] });
      toast.success("Платеж успешно подтвержден.");
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при подтверждении платежа.";
      toast.error(errorMessage);
    },
  });
};

export const useCancelPayment = () => {
  const queryClient = useQueryClient();
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (id) => {
      return cancelPayment(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["visitInfo"] });
      toast.success("Платеж успешно отменен.");
    },

    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при отмене платежа.";
      toast.error(errorMessage);
    },
  });
};

export const useAddMaterialsForVisit = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    { appointment_id: number; appointment_materials: IAppointmentMaterials }
  >({
    mutationFn: addMaterialsForVisit,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["visitInfo"] });
      toast.success("Материалы успешно добавлены.");
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при добавлении материалов.";
      toast.error(errorMessage);
    },
  });
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<ICreateNotification, Error, any>({
    mutationFn: createNotification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Напоминание успешно создано.");
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при создании напоминании.";
      toast.error(errorMessage);
    },
  });
};
