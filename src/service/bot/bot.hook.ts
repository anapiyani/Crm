import { useMutation } from "@tanstack/react-query";
import { textToBot } from "./bot.service";
import toast from "react-hot-toast";

export const useTextToBot = () => {
  return useMutation<
    { response: string; history: unknown[] },
    Error,
    { query: string }
  >({
    mutationFn: textToBot,
    onSuccess: () => {
      console.log("Success");
    },
    onError: () => {
      toast.error("Что-то пошло не так.");
    },
  });
};
