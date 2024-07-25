import { useMutation } from "@tanstack/react-query";
import { kassaWithdraw } from "./kassa.service";
import toast from "react-hot-toast";
import { IWithdrawal } from "@/ts/kassa.interface";

export const useWithdrawl = () => {
  return useMutation<IWithdrawal, Error, IWithdrawal>({
    mutationFn: kassaWithdraw,
    onSuccess: (data) => {
      toast.success("Деньги успешно сняты");
      return data;
    },
    onError: () => {
      toast.error("Ошибка при снятии денег");
    },
  });
};
