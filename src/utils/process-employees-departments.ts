import { IEmployeeDepartment } from "@/ts/client.interface";

interface EmployeeOption {
  nodeType: string;
  nodeName: string;
  nodeId?: number;
  uniqueKey: string;
}

export const processEmployeeOptions = (
  data: IEmployeeDepartment[]
): EmployeeOption[] => {
  const options: EmployeeOption[] = [];

  data.forEach((department, departmentIndex) => {
    if (department.employees.length > 0) {
      options.push({
        nodeType: "department",
        nodeName: department.department,
        nodeId: departmentIndex,
        uniqueKey: `department-${departmentIndex}`,
      });

      department.employees.forEach((employee) => {
        options.push({
          nodeType: "role",
          nodeName: `${employee.full_name}, ${employee.position}`,
          nodeId: employee.employee_id,
          uniqueKey: `${employee.employee_id}-${department.department}`,
        });
      });
    }
  });

  return options;
};
