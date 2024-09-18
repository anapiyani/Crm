import api from "../api";

export const textToBot = ({
  query,
}: {
  query: string;
}): Promise<{ response: string }> => {
  return api.post("/bot/bot/", { query }).then((res) => res.data);
};
