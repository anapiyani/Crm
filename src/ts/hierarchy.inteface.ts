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

export interface IAddHierarchy {
  name: string;
  level: string;
  parent?: number;
  services: number[];
  role: number[];
}

export interface IMoveHierarchy {
  item: number;
  type: string;
  to: number;
}
