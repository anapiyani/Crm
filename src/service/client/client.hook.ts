import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addClient, depositTopUp, depositUpdate } from "./client.service";
import {
  IClientAddForm,
  IClientDepositTopUp,
  ICreateClientReturn,
} from "@/ts/client.interface";

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

export const useDepositTopUp = () => {
  const queryClient = useQueryClient();
  return useMutation<IClientDepositTopUp, Error, any>({
    mutationFn: depositTopUp,
    onSuccess: (data) => {
      toast.success("Депозит успешно пополнен!.");
      queryClient.invalidateQueries({
        queryKey: ["getDepositHistory", "clientTransactions"],
      });
      return data;
    },
    onError: (error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });
};

export const useDepositUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation<IClientDepositTopUp, Error, any>({
    mutationFn: depositUpdate,
    onSuccess: (data) => {
      toast.success("Депозит успешно обновлён!.");
      queryClient.invalidateQueries({
        queryKey: ["getDepositHistory", "clientTransactions"],
      });
      return data;
    },
    onError: (error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });
};
