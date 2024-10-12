import api from "../api";

export const textToBot = ({
  query,
}: {
  query: string;
}): Promise<{ response: string; history: unknown[] }> => {
  return api.post("/bot/chat/", { query }).then((res) => res.data);
};
