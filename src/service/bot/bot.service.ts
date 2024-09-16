import api from "../api";

export const textToBot = ({ query }: { query: string }): Promise<any> => {
  return api.post("/bot/bot/", { query }).then((res) => res.data);
};
