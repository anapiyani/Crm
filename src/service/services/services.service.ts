import api from "../api";

export const getService = () => {
  return api.get("/services/services/").then((res) => res.data);
};


