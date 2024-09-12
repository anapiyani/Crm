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
      if (Array.isArray(node.services)) {
        node.services.forEach((service) => {
          const parameters: { id: number; name: string; price: number }[] = [];
          if (Array.isArray(service.service.price_details)) {
            service.service.price_details.forEach((parameter) => {
              parameters.push({
                id: parameter.parameter_id,
                name: parameter.parameter_name,
                price: parameter.price,
              });
            });
          }
          departmentServices.push({
            id: service.service_id,
            service_id: service.service_id,
            quantity: 1,
            serviceName: service.service.name,
            parameter: parameters,
          });
        });
      }

      if (Array.isArray(node.children)) {
        node.children.forEach((child) => collectServices(child));
      }
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
