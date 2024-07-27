import { IServiceCategory } from "@/ts/service.interface";
import api from "../api";
import {
  IfilterRequest,
  IfiltersResponse,
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
