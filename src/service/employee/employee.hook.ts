import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  addEmployee,
  addTemplate,
  assignTemplate,
  deleteTemplate,
  deleteWalletHistory,
  editEmployee,
  editTemplatePut,
  IAddEmployeeInterface,
} from "./employee.service";
import { IEmployeeAddForm } from "@/ts/types";
import {
  ITemplate,
  IUserDetails,
  IUserDetailsChange,
} from "@/ts/employee.interface";

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

export const useEditEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IUserDetails,
    Error,
    { user_id: number; form: Partial<IUserDetailsChange> }
  >({
    mutationFn: editEmployee,
    onSuccess: (data) => {
      toast.success("Сотрудник успешно изменен!.");
      queryClient.invalidateQueries({ queryKey: ["mainInfoEmployee"] });
      return data;
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Произошла ошибка при изменении сотрудника.";
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

export const useAddTemplate = (type: "production" | "management" | "admin") => {
  const queryClient = useQueryClient();
  let queryKey = ["templateList"];
  switch (type) {
    case "production":
      queryKey = ["templateList"];
      break;
    case "management":
      queryKey = ["managementTemplateList"];
      break;
    case "admin":
      queryKey = ["adminTemplateList"];
      break;
  }
  return useMutation<ITemplate, Error, ITemplate>({
    mutationFn: addTemplate,
    onSuccess: (data) => {
      toast.success("Шаблон успешно добавлен!.");
      queryClient.invalidateQueries({ queryKey });
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

export const useAssignTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation<
    void,
    Error,
    { user_id: number; template_id: number | null }
  >({
    mutationFn: assignTemplate,
    onSuccess: () => {
      toast.success("Шаблон успешно назначен!.");
      queryClient.invalidateQueries({ queryKey: ["employeeTemplate"] });
    },
    onError: (error) => {
      const errorMessage = error.name || "Шаблон для сотрудника уже назначен.";
      toast.error(errorMessage);
    },
  });
};
