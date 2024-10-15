import api from "../api";
import { TBotResponse } from "@/ts/bot.types";

export const textToBot = ({
  query,
}: {
  query: string;
}): Promise<TBotResponse> => {
  return api.post("/bot/chat/", { query }).then((res) => res.data);
};
