import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import RecursiveCheckbox from "@/components/recursive-checkbox/recursive-checkbox";
import {
  getHierarchyById,
  getHierarchyDepartments,
} from "@/service/hierarchy/hierarchy.service";
import {
  THierarchyDepartments,
  THierarchyDepartmentsChild,
} from "@/ts/service.interface";

interface ILazyCheckboxProps {
  onServiceChange: (
    id: number,
    isChecked: number,
    type: "service" | "category",
    name: string,
    parent: number | null,
    parent_name: string | null
  ) => void;
  preCheckedItems: {
    id: number;
    type: "service" | "category";
    isChecked: number;
  }[];
  onParentChange?: (parentId: number | null, childCheckedState: number) => void;
}

interface IEnhancedDepartment {
  id: number;
  name: string;
  services: THierarchyDepartments[];
  children: IEnhancedDepartment[];
  parent: number | null;
  parent_name: string | null;
  isLoaded?: boolean;
}

const LazyLoadingCheckbox: React.FC<ILazyCheckboxProps> = ({
  onServiceChange,
  preCheckedItems,
  onParentChange,
}) => {
  const [departments, setDepartments] = useState<IEnhancedDepartment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInitialDepartments();
  }, []);

  const loadInitialDepartments = async () => {
    try {
      const rootDepts = await getHierarchyDepartments();
      const enhancedDepts = rootDepts.map((dept) => ({
        ...dept,
        services: [],
        children: [],
        parent: null,
        parent_name: null,
        isLoaded: false,
      }));
      setDepartments(enhancedDepts);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading initial departments:", error);
      setIsLoading(false);
    }
  };

  const updateDepartmentChildren = (
    departments: IEnhancedDepartment[],
    targetId: number,
    newChildren: THierarchyDepartmentsChild
  ): IEnhancedDepartment[] => {
    return departments.map((dept) => {
      if (dept.id === targetId) {
        return {
          ...dept,
          services: newChildren.services,
          children: newChildren.children.map((child) => ({
            ...child,
            services: [],
            children: [],
            parent: dept.id,
            parent_name: dept.name,
            isLoaded: false,
          })),
          isLoaded: true,
        };
      }
      if (dept.children.length > 0) {
        return {
          ...dept,
          children: updateDepartmentChildren(
            dept.children,
            targetId,
            newChildren
          ),
        };
      }
      return dept;
    });
  };

  const handleDepartmentExpand = async (departmentId: number) => {
    const findDepartment = (
      depts: IEnhancedDepartment[]
    ): IEnhancedDepartment | null => {
      for (const dept of depts) {
        if (dept.id === departmentId) return dept;
        if (dept.children.length > 0) {
          const found = findDepartment(dept.children);
          if (found) return found;
        }
      }
      return null;
    };

    const department = findDepartment(departments);
    if (!department?.isLoaded) {
      try {
        const children = await getHierarchyById(departmentId);
        setDepartments((prevDepts) =>
          updateDepartmentChildren(prevDepts, departmentId, children)
        );
      } catch (error) {
        console.error(
          `Error loading children for department ${departmentId}:`,
          error
        );
      }
    }
  };

  const transformToServiceCategory = (dept: IEnhancedDepartment): any => ({
    id: dept.id,
    name: dept.name,
    services: dept.services,
    children: dept.children.map(transformToServiceCategory),
    parent: dept.parent,
    parent_name: dept.parent_name,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      {departments.map((department) => (
        <RecursiveCheckbox
          key={`department-${department.id}`}
          category={transformToServiceCategory(department)}
          onServiceChange={onServiceChange}
          preCheckedItems={preCheckedItems}
          onParentChange={onParentChange}
          onExpand={handleDepartmentExpand}
        />
      ))}
    </>
  );
};

export default LazyLoadingCheckbox;
