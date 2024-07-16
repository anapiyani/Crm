import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  addEmployee,
  IAddEmployeeInterface,
  searchEmployee,
} from "./employee.service";
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
        "Произошла ошибка при добавлении сотрудника." || error.message;
      toast.error(errorMessage);
    },
  });
};
