import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  confirmPayment,
  deleteVisit,
  feedback,
  report,
} from "./activity.service";
import { IPaymentConfirm, IReviewFeedback } from "@/ts/activity.interface";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitsData"] });
      toast.success("Платеж успешно подтвержден.");
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при подтверждении платежа.";
      toast.error(errorMessage);
    },
  });
};
