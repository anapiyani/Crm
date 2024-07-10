import { IServiceCategory } from "@/ts/types";
import api from "../api";

export const getServices = (): Promise<IServiceCategory[]> => {
  return api.get("/hierarchy/hierarchy/").then((res) => res.data);
};
