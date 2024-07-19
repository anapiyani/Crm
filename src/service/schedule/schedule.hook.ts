import { useMutation } from "@tanstack/react-query";
import { addBreakToSchedule } from "./schedule.service";
import { IBreaks } from "@/ts/schedule.interface";
import toast from "react-hot-toast";

export const useAddBreakToSchedule = () => {
  return useMutation<IBreaks, Error, Omit<IBreaks, "id">>({
    mutationFn: addBreakToSchedule,
    onSuccess: (data) => {
      toast.success("Перерыв успешно добавлен!.");
      return data;
    },
    onError: (error) => {
      const errorMessage =
        "Произошла ошибка при добавлении перерыва." || error.message;
      toast.error(errorMessage);
    },
  });
};
