import api from "../api";
import { TBotHistory, TBotHistoryResponse, TBotResponse } from "@/ts/bot.types";

export const textToBot = ({
  query,
}: {
  query: string;
}): Promise<TBotResponse> => {
  return api.post("/bot/chat/", { query }).then((res) => res.data);
};

export const getBotHistory = (): Promise<TBotHistoryResponse> => {
  return api.get("/bot/history/").then((res) => res.data);
};
