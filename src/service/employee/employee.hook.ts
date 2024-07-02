import { useMutation } from "@tanstack/react-query";
import { addEmployee, IAddEmployeeInterface } from "./employee.service";
import { IEmployeeAddForm } from "@/ts/types";

export const useAddEmployee = () => {
  return useMutation<IAddEmployeeInterface, string, IEmployeeAddForm>({
    mutationFn: addEmployee,
    onSuccess: (data) => {
      console.log(data);
      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
