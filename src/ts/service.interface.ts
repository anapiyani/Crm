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
export interface IServicePrices {
  service: string;
  roles: {
    role: string;
    parameters?: string[];
    prices: {
      parameter?: string;
      price: number;
      type: string;
    }[];
  }[];
}

export interface IServiceCalculation {
  employee_percentage: number;
  positions: {
    name: string;
    employees: {
      full_name: string;
      user: number;
    }[];
  }[];
}

export interface IServiceCostData {
  position: string;

  cost?: number;
  costFrom?: number;
  costTo?: number;
  shortHair?: number;
  mediumHair?: number;
  longHair?: number;
  roots?: number;
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
  service_id: number;
  role: number;
  parameters: {
    id: number;
    name: string;
    price: number;
    type: string;
  }[];
}

export interface IEmployeeServiceHierarchy {
  id: number;
  name: string;
  level: string;
  children: IEmployeeServiceHierarchy[];
  services: {
    service_id: number;
    min_price: number;
    service: {
      name: string;
      role_id: number;
      role_name: string;
      price_details: {
        parameter_id: number;
        parameter_name: string;
        service_price_id: number;
        price: number;
        type: string;
      }[];
    };
  }[];
}

export interface IHierarchyFlattenService {
  id: number;
  service_id: number;
  quantity: number;
  serviceName: string;
  parameter: {
    id: number;
    name: string;
    price: number;
  }[];
}
