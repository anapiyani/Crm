import { IMaterial } from "./storage.interface";

export interface Ifilters {
  id: number;
  name: string;
  level: string;
}
export interface IfiltersResponse {
  departments: Ifilters[];
  sections: Ifilters[];
  categories: Ifilters[];
  service_types: Ifilters[];
  groups: Ifilters[];
  subcategories: Ifilters[];
  roles: Omit<Ifilters, "level">[];
}
export interface IfilterRequest {
  category: string;
  department: string;
  group: string;
  keyword: string;
  role: string;
  section: string;
  service_type: string;
  subcategory: string;
}

export interface ISearchResult {
  hierarchical_items: {
    id: number;
    name: string;
    level: string;
  }[];

  services: {
    id: number;
    name: string;
  }[];
}
export interface ISearchResultStorage {
  hierarchical_items: {
    id: number;
    name: string;
    level: string;
  }[];

  materials: {
    id: number;
    name: string;
  }[];
}

export interface IAddHierarchy {
  name: string;
  level: string;
  parent?: number;
  services: number[];
  role: number[];
}
export interface IAddStorageHierarchy {
  name: string;
  level: string;
  parent?: number;
  materials: number[];
}

export interface IMoveHierarchy {
  item: number;
  type: string;
  to: number;
}

export interface IRolesbyDepartment {
  department: string;
  roles: [
    {
      id: number;
      name: string;
    },
  ];
}

export interface IStorageCategory {
  id: number;
  name: string;
  level: string;
  parent: number | null;
  parent_name: string | null;
  children: IStorageCategory[];
  materials: IMaterial[];
}

export interface IServiceParent {
  id: number;
  name: string;
  level: string;
  parent: number | null;
}

export interface IDepartmentHierarchy {
  department: string;
  roles: IEmployeesRoles[];
}
export interface IEmployeesRoles {
  id: number;
  name: string;
  employees: IEmployeeDepartment[];
}
export interface IEmployeeDepartment {
  user_id: number;
  full_name: string;
  color?: string;
}
