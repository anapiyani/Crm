import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addBreakToSchedule,
  addEmployeeToSchedule,
  addTimeOffToScheduleByDate,
  deleteBreakFromSchedule,
  longBreak,
  scheduleEmployeeChange,
  scheduleEmployeeSettings,
  updateEmployeePosition,
} from "./schedule.service";
import { IBreaks, ILongBreaks } from "@/ts/schedule.interface";
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
        error.message || "Произошла ошибка при добавлении перерыва.";
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
        error.message || "Произошла ошибка при удалении перерыва.";
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

export const useAddEmployeeToSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addEmployeeToSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      toast.success("Сотрудник успешно добавлен");
    },
    onError: () => {
      toast.error("Ошибка при добавлении сотрудника");
    },
  });
};

export const useReorderEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmployeePosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeData"] });
      toast.success("Сотрудник успешно перемещен");
    },
    onError: (error) => {
      toast.error(error.message || "Ошибка при перемещении сотрудника");
    },
  });
};

export const useLongBreak = () => {
  const queryClient = useQueryClient();
  return useMutation<ILongBreaks, Error, any>({
    mutationFn: longBreak,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduleEmployees"] });
      toast.success("Длинный перерыв успешно добавлен");
    },
    onError: () => {
      toast.error("Ошибка при добавлении длинного перерыва");
    },
  });
};

export const useChangeSchedule = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: scheduleEmployeeChange,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["scheduleEmployees"] });
      toast.success("Изменения сохранены");
    },
    onError: () => {
      toast.error("Ошибка при сохранении изменений");
    },
  });
};

export const useSettingsScheduleEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: scheduleEmployeeSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduleEmployees"] });
      toast.success("Изменения сохранены");
    },
    onError: () => {
      toast.error("Ошибка при сохранении изменений");
    },
  });
};
