import {
  IEmployeeServiceHierarchy,
  IService,
  IServiceCategory,
  TKatalogHierarchy,
} from "@/ts/service.interface";
import api from "../api";
import {
  IAddHierarchy,
  IAddStorageHierarchy,
  IDepartmentHierarchy,
  IfilterRequest,
  IfiltersResponse,
  IMoveHierarchy,
  IRolesbyDepartment,
  ISearchResult,
  IStorageCategory,
} from "@/ts/hierarchy.inteface";
import { IEmployeeDepartment } from "@/ts/client.interface";

export const getHierarchy = (): Promise<IServiceCategory[]> => {
  return api.get("/hierarchy/hierarchy/").then((res) => res.data);
};

export const getHierarchyKatalog = async (
  parentId?: number
): Promise<TKatalogHierarchy[]> => {
  const url = parentId
    ? `/hierarchy/katalog?parent_id=${parentId}`
    : "/hierarchy/katalog";

  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching hierarchy data:", error);
    throw error;
  }
};
export const getHierarchyByDepartment = (): Promise<IServiceCategory[]> => {
  return api.get("/hierarchy/hierarchy-categories/").then((res) => res.data);
};

export const getHierarchySearchOption = (): Promise<IfiltersResponse> => {
  return api.get("/hierarchy/filter-options/").then((res) => res.data);
};

export const getSearchResults = (
  filter: IfilterRequest
): Promise<ISearchResult> => {
  const params = new URLSearchParams({
    category: filter.category,
    department: filter.department,
    group: filter.group,
    keyword: filter.keyword,
    role: filter.role,
    section: filter.section,
    service_type: filter.service_type,
    subcategory: filter.subcategory,
  }).toString();
  return api.get(`/hierarchy/search/?${params}`).then((res) => res.data);
};

export const addHierarchy = (
  data: IAddHierarchy
): Promise<IServiceCategory> => {
  return api.post("/hierarchy/hierarchy/", data).then((res) => res.data);
};

export const addStorageHierarchy = (
  data: IAddStorageHierarchy
): Promise<IStorageCategory> => {
  return api
    .post("/hierarchy/hierarchy-storage/", data)
    .then((res) => res.data);
};

export const moveHierarchy = async (
  data: IMoveHierarchy
): Promise<IServiceCategory> => {
  const body = {
    material_id: data.item,
    new_location_id: data.to,
  };
  const res = await api.post("/hierarchy/move-material-to-location/", body);
  return res.data;
};

export const createServiceBasic = (data: {
  parent: number;
  name: string;
}): Promise<IService> => {
  const params = new URLSearchParams({
    hierarchical_item_id: data.parent?.toString(),
    name: data.name,
  }).toString();
  return api
    .post("/services/services/create_basic/?" + params)
    .then((res) => res.data);
};

export const moveStorageHierarchy = (
  data: IMoveHierarchy
): Promise<IStorageCategory> => {
  const params = new URLSearchParams({
    item_id: data.item.toString(),
    item_type: data.type,
    new_parent_id: data.to.toString(),
  }).toString();
  return api
    .post("/hierarchy/hierarchical-items-storage/move/?" + params)
    .then((res) => res.data);
};

export const updateHierarchy = (
  data: IServiceCategory
): Promise<IServiceCategory> => {
  const reqbody = {
    name: data.name,
    level: data.level,
    services: [],
    role: [],
  };
  const params = new URLSearchParams({
    id: data.id.toString(),
  }).toString();
  return api
    .put(`/hierarchy/hierarchy/${data.id}/`, reqbody)
    .then((res) => res.data);
};

export const updateStorageHierarchy = (
  data: TKatalogHierarchy
): Promise<TKatalogHierarchy> => {
  const reqbody = {
    name: data.name,
    level: data.level,
    parent: data.id,
    materials: [],
  };

  return api
    .put(`/hierarchy/hierarchy-storage/${data.id}/`, reqbody)
    .then((res) => res.data);
};

export const getRolesByDepartments = (): Promise<IRolesbyDepartment[]> => {
  return api.get("/hierarchy/roles-with-departments/").then((res) => res.data);
};
export const linkRoleToHierarchy = (data: {
  department_id: number;
  role_id: number;
}): Promise<{
  department_id: number;
  role_id: number;
}> => {
  return api.post("/hierarchy/roles/associate/", data).then((res) => res.data);
};
export const deleteHierarchy = (id: number): Promise<void> => {
  return api.delete(`/hierarchy/hierarchy/${id}/`).then((res) => res.data);
};

export const deleteStorageHierarchy = (id: number): Promise<void> => {
  return api
    .delete(`/hierarchy/hierarchy-storage/${id}/`)
    .then((res) => res.data);
};

export const getHierarchyStorage = (): Promise<IStorageCategory[]> => {
  return api.get("/hierarchy/hierarchy-storage/").then((res) => res.data);
};

export const getHierarchyByEmployeeId = (
  employeeId: string
): Promise<IEmployeeServiceHierarchy[]> => {
  return api
    .get(`/hierarchy/services-by-employee/${employeeId}/`)
    .then((res) => res.data);
};

export const getHierarchyById = (id: number): Promise<IServiceCategory> => {
  return api.get(`/hierarchy/hierarchy/${id}/`).then((res) => res.data);
};
export const getHierarchyStorageById = (
  id: number
): Promise<IStorageCategory> => {
  return api.get(`/hierarchy/hierarchy-storage/${id}/`).then((res) => res.data);
};

export const getHierarchyEmployeesByDepartment = (): Promise<
  IEmployeeDepartment[]
> => {
  return api
    .get("/hierarchy/employees-by-departments/")
    .then((res) => res.data);
};

export const getRoleEployeeByDepartment = (): Promise<
  IDepartmentHierarchy[]
> => {
  return api
    .get("/hierarchy/roles-departments-employees/")
    .then((res) => res.data);
};
