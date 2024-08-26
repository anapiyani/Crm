import { IRolesbyDepartment } from "@/ts/hierarchy.inteface";

export const proccessRoleOptions = (roles: IRolesbyDepartment[]) => {
  const results: {
    nodeType: string;
    nodeName: string;
    nodeId?: number;
  }[] = [];
  roles.forEach((role) => {
    results.push({
      nodeType: "department",
      nodeName: role.department,
    });
    role.roles.forEach((r) => {
      results.push({
        nodeType: "role",
        nodeName: r.name,
        nodeId: r.id,
      });
    });
  });
  return results;
};
