import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addBreakToSchedule,
  addTimeOffToScheduleByDate,
  deleteBreakFromSchedule,
} from "./schedule.service";
import { IBreaks } from "@/ts/schedule.interface";
import toast from "react-hot-toast";

export const useAddBreakToSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation<IBreaks, Error, Omit<IBreaks, "id">>({
    mutationFn: addBreakToSchedule,
    onSuccess: (data) => {
      toast.success("Перерыв успешно добавлен!.");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      return data;
    },
    onError: (error) => {
      const errorMessage =
        "Произошла ошибка при добавлении перерыва." || error.message;
      toast.error(errorMessage);
    },
  });
};

export const useDeleteBreakFromSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id) => deleteBreakFromSchedule(id),
    onSuccess: (data) => {
      toast.success("Перерыв успешно удален!.");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      return data;
    },
    onError: (error) => {
      const errorMessage =
        "Произошла ошибка при удалении перерыва." || error.message;
      toast.error(errorMessage);
    },
  });
};

export const useTimeOffToSchedule = () => {
  return useMutation({
    mutationFn: ({
      employee_id,
      date,
    }: {
      date: string;
      employee_id: string;
    }) => addTimeOffToScheduleByDate(employee_id, date),
    onSuccess: () => {
      toast.success("Отпуск успешно добавлен");
    },
    onError: () => {
      toast.error("Ошибка при добавлении отпуска");
    },
  });
};
