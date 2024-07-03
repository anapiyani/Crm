import { IDepartmentData, IRoleChange } from "@/ts/types";
import api from "../api";

export const getDepartment = (): Promise<IDepartmentData> => {
  return api.get("/departments/departments/").then((res) => res.data);
};

export const updateRole = ({
  id,
  name,
  department,
}: IRoleChange): Promise<IRoleChange> => {
  return api
    .put(`/departments/roles/${id}/`, { name, department })
    .then((res) => res.data);
};
