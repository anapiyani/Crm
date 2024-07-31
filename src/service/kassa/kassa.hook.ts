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

export const useSalary = (inRefetch?: () => void) => {
  return useMutation<ISalaryPayment, Error, ISalaryPayment>({
    mutationFn: salaryPayment,
    onSuccess: () => {
      toast.success("Зарплата успешно выдана");
      if (inRefetch) {
        inRefetch();
      }
    },
    onError: () => {
      toast.error("Ошибка при выдаче зарплаты");
    },
  });
};

export const useWithdrawl = (inRefetch?: () => void) => {
  return useMutation<IWithdrawal, Error, IWithdrawal>({
    mutationFn: kassaWithdraw,
    onSuccess: (data) => {
      toast.success("Деньги успешно сняты");
      if (inRefetch) {
        inRefetch();
      }
      return data;
    },
    onError: () => {
      toast.error("Ошибка при снятии денег");
    },
  });
};

export const useDepositKassa = (inRefetch?: () => void) => {
  return useMutation<IWithdrawal, Error, IWithdrawal>({
    mutationFn: kassaDeposit,
    onSuccess: (data) => {
      toast.success("Деньги успешно зачислены");
      if (inRefetch) {
        inRefetch();
      }
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
