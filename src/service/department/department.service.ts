import { IRoleChange, IRoleCreate } from "@/ts/types";
import { IDepartments } from "@/ts/departments.interface";
import api from "../api";

export const getDepartment = (): Promise<IDepartments> => {
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


export const getUsersByFilter = (age_from?: number, age_to?: number, department?: number, role?: number, search?: string) => {
  const params = new URLSearchParams(); 
  if (age_from) {
    params.append("age_from", age_from.toString());
  }
  if (age_to) {
    params.append("age_to", age_to.toString());
  }
  if (department) {
    params.append("department", department.toString());
  }
  if (role) {
    params.append("role", role.toString());
  } 
  if (search) {
    params.append("search", search);
  }

  return api.get(`/departments/employees/?${params.toString()}`).then((res) => res.data);
}