import { useMutation } from "@tanstack/react-query";
import { textToBot } from "./bot.service";
import { TBotResponse } from "@/ts/bot.types";

export const useTextToBot = () => {
  return useMutation<TBotResponse, Error, { query: string }>({
    mutationFn: textToBot,
    onSuccess: () => {},
    onError: () => {},
  });
};
