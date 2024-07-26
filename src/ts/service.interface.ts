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
}

export interface IServiceCategory {
  id: number;
  name: string;
  level: string;
  parent: number | null;
  children: IServiceCategory[];
  services: IService[];
}

export interface IUserService {
  id: number;
  service: number;
  role: number;
  parameter: string;
  price: string;
  type: string;
}
