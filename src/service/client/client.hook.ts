import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addClient } from "./client.service";
import { IClientAddForm, ICreateClientReturn } from "@/ts/client.interface";

export const useAddClient = () => {
  return useMutation<ICreateClientReturn, Error, IClientAddForm>({
    mutationFn: addClient,
    onSuccess: (data) => {
      toast.success("Клиент успешно добавлен!.");
      return data;
    },
    onError: (error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
    // "Произошла ошибка при добавлении клиента." ||
  });
};
