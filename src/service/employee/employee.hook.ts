import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addEmployee, IAddEmployeeInterface } from "./employee.service";
import { IEmployeeAddForm } from "@/ts/types";

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
