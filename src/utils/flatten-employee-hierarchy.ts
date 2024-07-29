import {
  IEmployeeServiceHierarchy,
  IHierarchyFlattenService,
} from "@/ts/service.interface";

export const flattenEmployeeHierarchy = (
  hierarchy: IEmployeeServiceHierarchy[]
): {
  departmentName: string;
  childrenServices: IHierarchyFlattenService[];
}[] => {
  const services: {
    departmentName: string;
    childrenServices: IHierarchyFlattenService[];
  }[] = [];

  hierarchy.forEach((department) => {
    const departmentServices: IHierarchyFlattenService[] = [];

    const collectServices = (node: IEmployeeServiceHierarchy) => {
      node.services.forEach((service) => {
        departmentServices.push({
          id: service.service_price_id,
          service: service.service,
          service_id: service.service,
          price: service.price,
          quantity: 1,
          parameter: service.parameter.toString(),
          parameter_id: service.parameter,
          serviceName: node.name,
        });
      });

      node.children.forEach((child) => collectServices(child));
    };

    collectServices(department);

    if (departmentServices.length > 0) {
      services.push({
        departmentName: department.name,
        childrenServices: departmentServices,
      });
    }
  });

  return services;
};
