import { useMutation } from "@tanstack/react-query";
import { kassaDeposit, kassaWithdraw } from "./kassa.service";
import toast from "react-hot-toast";
import { IWithdrawal } from "@/ts/kassa.interface";

export const useWithdrawl = (onSuccess?: () => void) => {
  return useMutation<IWithdrawal, Error, IWithdrawal>({
    mutationFn: kassaWithdraw,
    onSuccess: (data) => {
      toast.success("Деньги успешно сняты");
      if (onSuccess) {
        onSuccess();
      }
      return data;
    },
    onError: () => {
      toast.error("Ошибка при снятии денег");
    },
  });
};

export const useDepositKassa = (onSuccess?: () => void) => {
  return useMutation<IWithdrawal, Error, IWithdrawal>({
    mutationFn: kassaDeposit,
    onSuccess: (data) => {
      toast.success("Деньги успешно зачислены");
      if (onSuccess) {
        onSuccess();
      }
      return data;
    },
    onError: () => {
      toast.error("Ошибка при зачислении денег");
    },
  });
};
