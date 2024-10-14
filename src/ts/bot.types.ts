export type TBotResponse = {
  response: string;
  history: TBotHistory[];
};

export type TBotHistory = {
  user_query: string;
  bot_response: string;
  timestamp: string;
};
