export interface IDepartmentData {
  id: number;
  name: string;
  level: string;
  parent: number | null;
  children: IDepartmentsChild[];
  role: IRoles[];
}

export interface IDepartmentPagination {
  count: number;
  total_pages: number;
  items_per_page: number;
  next: string | null;
  previous: string | null;
  results: IDepartmentData[];
}

export interface IDepartmentsChild {
  id: number;
  name: string;
  level: string;
  parent: number;
  children: IDepartmentsChild[];
  services: any[];
}

export interface IRoles {
  id: number;
  name: string;
}
