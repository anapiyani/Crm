import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllBreaks } from "./services.service";
import toast from "react-hot-toast";

export const useDeleteAllBreaks = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { date: string; employee_id: string }>({
    mutationFn: ({
      date,
      employee_id,
    }: {
      date: string;
      employee_id: string;
    }) => deleteAllBreaks(date, employee_id),
    onSuccess: () => {
      toast.success("Все перерывы успешно удалены");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: () => {
      toast.error("Ошибка при удалении перерывов");
    },
  });
};
