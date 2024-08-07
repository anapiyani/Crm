export interface IDiscount {
  id: number;
  type: {
    id: number;
    name: string;
    description: string;
  };
  promotion_name: string;
  valid_date: string;
  size: string;
}

export interface IServiceParameters {
  id: number;
  service: number;
  name: string;
}

export interface IService {
  id: number;
  name: string;
  active: boolean;
  discount: IDiscount;
  is_deleted: boolean;
  duration: number;
  unit_mes: string;
  min_volume: number;
  department: number;
  parameters: IServiceParameters[];
  parent: number | null;
  parent_name: string;
}

export interface IServiceCategory {
  id: number;
  name: string;
  level: string;
  parent: number | null;
  parent_name: string;
  children: IServiceCategory[];
  services: IService[];
}

export interface IUserService {
  id: number;
  service: string;
  role: number;
  parameter: {
    id: number;
    name: string;
  };
  price: string;
  type: string;
}

export interface IEmployeeServiceHierarchy {
  id: number;
  name: string;
  level: string;
  children: IEmployeeServiceHierarchy[];
  services: {
    service_price_id: number;
    service: number;
    role: number;
    parameter: number;
    price: number;
    type: string;
  }[];
}

export interface IHierarchyFlattenService {
  id: number;
  service: number;
  service_id: number;
  price: number;
  quantity: number;
  parameter: string;
  parameter_id: number;
  serviceName: string;
}
