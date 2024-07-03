import { IDepartmentData, IRoleChange, IRoleCreate } from "@/ts/types";
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

export const deleteRole = (id: number) => {
  return api.delete(`/departments/roles/${id}/`).then((res) => res.data);
};

export const createRole = ({
  name,
  department,
}: {
  name: string;
  department: number;
}): Promise<IRoleCreate> => {
  return api
    .post("/departments/roles/create/", { name, department })
    .then((res) => res.data);
};
