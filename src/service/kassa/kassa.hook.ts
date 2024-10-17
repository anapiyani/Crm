import {
  IIndirectCategory,
  ISalaryPayment,
  IWithdrawal,
  TKassaTransaction,
} from "@/ts/kassa.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  addCategoryIndirectCosts,
  kassaTransaction,
  salaryPayment,
} from "./kassa.service";

export const useSalary = () => {
  const queryClient = useQueryClient();

  return useMutation<ISalaryPayment, Error, ISalaryPayment>({
    mutationFn: salaryPayment,
    onSuccess: () => {
      toast.success("Зарплата успешно выдана");
      queryClient.invalidateQueries({ queryKey: ["cashregister"] });
      queryClient.invalidateQueries({ queryKey: ["searchResult"] });
    },
    onError: () => {
      toast.error("Ошибка при выдаче зарплаты");
    },
  });
};

export const useKassaTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<TKassaTransaction, Error, TKassaTransaction>({
    mutationFn: kassaTransaction,
    onSuccess: (data) => {
      toast.success("Транзакция средств в кассе успешно выполнена");
      queryClient.invalidateQueries({ queryKey: ["cashregister"] });
      queryClient.invalidateQueries({ queryKey: ["searchResult"] });
      return data;
    },
    onError: () => {
      toast.error("Ошибка при транзакции средств в кассе");
    },
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<IIndirectCategory, Error, IIndirectCategory>({
    mutationFn: addCategoryIndirectCosts,
    onSuccess: () => {
      toast.success("Категория успешно добавлена");
      queryClient.invalidateQueries({ queryKey: ["indirectCosts"] });
    },
    onError: () => {
      toast.error("Ошибка при добавлении категории");
    },
  });
};
