import { IRoleChange, IRoleCreate } from "@/ts/types";
import { IDepartmentData } from "@/ts/departments.interface";

import api from "../api";

export const getDepartment = (): Promise<IDepartmentData[]> => {
  return api.get("/hierarchy/hierarchy-departments/").then((res) => res.data);
};

export const updateRole = ({ id, name }: IRoleChange): Promise<IRoleChange> => {
  return api.put(`/services/roles/${id}/`, { name }).then((res) => res.data);
};

export const deleteRole = (id: number) => {
  return api.delete(`/services/roles/${id}/`).then((res) => res.data);
};

export const createRole = ({
  name,
}: {
  name: string;
}): Promise<IRoleCreate> => {
  return api.post("/services/roles/", { name }).then((res) => res.data);
};

export const associateRole = ({
  department_id,
  role_id,
}: {
  department_id: number;
  role_id: number;
}): Promise<IRoleCreate> => {
  return api
    .post("/hierarchy/roles/associate/", { department_id, role_id })
    .then((res) => res.data);
};
