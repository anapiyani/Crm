import { IServiceCategory } from "@/ts/service.interface";
import api from "../api";
import {
  IAddHierarchy,
  IfilterRequest,
  IfiltersResponse,
  IMoveHierarchy,
  ISearchResult,
} from "@/ts/hierarchy.inteface";

export const getHierarchy = (): Promise<IServiceCategory[]> => {
  return api.get("/hierarchy/hierarchy/").then((res) => res.data);
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

export const moveHierarchy = (
  data: IMoveHierarchy
): Promise<IServiceCategory> => {
  const params = new URLSearchParams({
    item_id: data.item.toString(),
    item_type: data.type,
    new_parent_id: data.to.toString(),
  }).toString();
  return api
    .post("/hierarchy/hierarchical-items/move/?" + params)
    .then((res) => res.data);
};
