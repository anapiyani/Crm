import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteVisit } from "./activity.service";

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
