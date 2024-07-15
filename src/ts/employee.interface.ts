export interface IDepartments {
  count: number;
  next: string;
  previous: string;
  results: IDepartmentData[];
}

export interface IDepartmentData {
  id: number;
  name: string;
  level: string;
  parent: number | null;
  children: IDepartmentsChild[];
  role: IRoles[];
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
