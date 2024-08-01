import {
  IIndirectCategory,
  ISalaryPayment,
  IWithdrawal,
} from "@/ts/kassa.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  addCategoryIndirectCosts,
  kassaDeposit,
  kassaWithdraw,
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

export const useWithdrawl = () => {
  const queryClient = useQueryClient();

  return useMutation<IWithdrawal, Error, IWithdrawal>({
    mutationFn: kassaWithdraw,
    onSuccess: (data) => {
      toast.success("Деньги успешно сняты");
      queryClient.invalidateQueries({ queryKey: ["cashregister"] });
      queryClient.invalidateQueries({ queryKey: ["searchResult"] });
      return data;
    },
    onError: () => {
      toast.error("Ошибка при снятии денег");
    },
  });
};

export const useDepositKassa = () => {
  const queryClient = useQueryClient();
  return useMutation<IWithdrawal, Error, IWithdrawal>({
    mutationFn: kassaDeposit,
    onSuccess: (data) => {
      toast.success("Деньги успешно зачислены");
      queryClient.invalidateQueries({ queryKey: ["cashregister"] });
      queryClient.invalidateQueries({ queryKey: ["searchResult"] });
      return data;
    },
    onError: () => {
      toast.error("Ошибка при зачислении денег");
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
