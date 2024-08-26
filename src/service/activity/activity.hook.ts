import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteVisit, feedback } from "./activity.service";
import { IReviewFeedback } from "@/ts/activity.interface";

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
  return useMutation<IReviewFeedback, Error, IReviewFeedback>({
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
