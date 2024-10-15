import { useCallback } from "react";

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

export type IServicePriceCurrent = {
  title: string;
  isService: boolean;
  isDepartment: boolean;
  cost?: number;
  costFrom?: number;
  costTo?: number;
  shortHair?: number;
  mediumHair?: number;
  longHair?: number;
  veryLongHair?: number;
  children: IServicePriceCurrent[];
  type?: "department" | "section" | "category" | "subcategory" | "service";
};

export type IServiceService = {
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
  service_id: number;
};

export type IServicePriceTree = {
  id: number;
  name: string;
  level: string;
  children?: IServicePriceTree[] | [];
  services?: IServiceService[];
};

export const useTraverseServicePrice = () => {
  const traverse = useCallback(
    (
      data: IServicePriceTree[]
    ): { items: IServicePriceCurrent[]; hasParameters: boolean } => {
      let result: IServicePriceCurrent[] = [];
      let foundParameters = false;

      data.forEach((item) => {
        let tableItem: IServicePriceCurrent = {
          title: item.name,
          isService: false,
          isDepartment: item.level === "department",
          children: [],
          type: item.level as
            | "department"
            | "section"
            | "category"
            | "subcategory"
            | "service",
        };

        if (item.children && item.children.length > 0) {
          const { items, hasParameters: childHasParameters } = traverse(
            item.children
          );
          tableItem.children = items;
          if (childHasParameters) {
            foundParameters = true;
          }
        }

        if (item.services && item.services.length > 0) {
          item.services.forEach((service) => {
            let serviceItem: IServicePriceCurrent = {
              title: service.service.name,
              isService: true,
              isDepartment: false,
              cost: service.min_price
                ? service.min_price
                : service.service.price_details[0]?.price,
              children: [],
              type: "service",
            };

            serviceItem.costFrom = service.min_price;
            serviceItem.costTo = service.min_price;

            service.service.price_details.forEach((priceDetail) => {
              switch (priceDetail.parameter_name) {
                case "Короткие от 10 см":
                  serviceItem.shortHair = priceDetail.price;
                  break;
                case "Средние 15-20 см":
                  serviceItem.mediumHair = priceDetail.price;
                  break;
                case "Длинные 30-40 см":
                  serviceItem.longHair = priceDetail.price;
                  break;
                case "Очень длинные 50-60 см":
                  serviceItem.veryLongHair = priceDetail.price;
                  break;
                default:
                  break;
              }
            });

            if (
              serviceItem.shortHair !== undefined ||
              serviceItem.mediumHair !== undefined ||
              serviceItem.longHair !== undefined ||
              serviceItem.veryLongHair !== undefined
            ) {
              foundParameters = true;
            }

            serviceItem.costFrom = Math.min(
              serviceItem.shortHair ?? 0,
              serviceItem.mediumHair ?? 0,
              serviceItem.longHair ?? 0,
              serviceItem.veryLongHair ?? 0
            );

            serviceItem.costTo = Math.max(
              serviceItem.shortHair ?? 0,
              serviceItem.mediumHair ?? 0,
              serviceItem.longHair ?? 0,
              serviceItem.veryLongHair ?? 0
            );

            tableItem.children.push(serviceItem);
          });
        }

        result.push(tableItem);
      });

      return { items: result, hasParameters: foundParameters };
    },
    []
  );

  return { traverse };
};
