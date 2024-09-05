import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  addEmployee,
  addTemplate,
  deleteTemplate,
  deleteWalletHistory,
  editTemplatePut,
  IAddEmployeeInterface,
} from "./employee.service";
import { IEmployeeAddForm } from "@/ts/types";
import { ITemplate } from "@/ts/employee.interface";

export const useAddEmployee = () => {
  return useMutation<IAddEmployeeInterface, Error, IEmployeeAddForm>({
    mutationFn: addEmployee,
    onSuccess: (data) => {
      toast.success("Сотрудник успешно добавлен!.");
      return data;
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при добавлении сотрудника.";
      toast.error(errorMessage);
    },
  });
};

export const useEditTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation<ITemplate, Error, { form: ITemplate; id: number }>({
    mutationFn: editTemplatePut,
    onSuccess: (data) => {
      toast.success("Шаблон успешно изменен!.");
      queryClient.invalidateQueries({ queryKey: ["templateList"] });
      return data;
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при изменении шаблона.";
      toast.error(errorMessage);
    },
  });
};

export const useAddTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation<ITemplate, Error, ITemplate>({
    mutationFn: addTemplate,
    onSuccess: (data) => {
      toast.success("Шаблон успешно добавлен!.");
      queryClient.invalidateQueries({ queryKey: ["templateList"] });
      return data;
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при добавлении шаблона.";
      toast.error(errorMessage);
    },
  });
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteTemplate,
    onSuccess: () => {
      toast.success("Шаблон успешно удален!.");
      queryClient.invalidateQueries({ queryKey: ["templateList"] });
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при удалении шаблона.";
      toast.error(errorMessage);
    },
  });
};

export const useDeleteWallethistory = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteWalletHistory,
    onSuccess: () => {
      toast.success("История успешно удалена!.");
      queryClient.invalidateQueries({ queryKey: ["salaryData"] });
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при удалении истории.";
      toast.error(errorMessage);
    },
  });
};
