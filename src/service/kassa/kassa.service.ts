import { IKassaOperations } from "@/ts/kassa.interface";
import api from "../api";

export const getOperations = (): Promise<IKassaOperations[]> => {
  return api.get("/operations/").then((res) => res.data);
};
