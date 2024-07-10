import { ServiceCategory } from "@/ts/types";
import api from "../api";

export const getServices = (): Promise<ServiceCategory[]> => {
  return api.get("/hierarchy/hierarchy/").then((res) => res.data);
};
