import { IServiceCategory } from "@/ts/types";
import api from "../api";

export const getHierarchy = (): Promise<IServiceCategory[]> => {
  return api.get("/hierarchy/hierarchy/").then((res) => res.data);
};
export const getHierarchyByDepartment = (): Promise<IServiceCategory[]> => {
  return api.get("/hierarchy/hierarchy-categories/").then((res) => res.data);
};
