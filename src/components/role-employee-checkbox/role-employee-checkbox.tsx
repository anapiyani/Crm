import React, { useState, useEffect } from "react";
import { getRoleEployeeByDepartment } from "@/service/hierarchy/hierarchy.service";
import { IDepartmentHierarchy } from "@/ts/hierarchy.inteface";
import { useQuery } from "@tanstack/react-query";
import classes from "./styles.module.scss";
import {
  ArrowDownward,
  ArrowDropDown,
  ArrowDropUp,
  ArrowUpward,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

interface RoleEmployeeCheckboxProps {
  onEmployeeSelectionChange: (
    selectedEmployeeIds: { id: number; color?: string }[]
  ) => void;
  generateColors?: () => string;
}

const RoleEmployeeCheckbox: React.FC<RoleEmployeeCheckboxProps> = ({
  onEmployeeSelectionChange,
  generateColors,
}) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["roleEmployeeCheckbox"],
    queryFn: getRoleEployeeByDepartment,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [openBranches, setOpenBranches] = useState<Record<string, boolean>>({});

  const handleCheck = (
    id: string,
    checked: boolean,
    childrenIds?: string[],
    parentId?: string
  ) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [id]: checked };

      // Update children
      if (childrenIds) {
        childrenIds.forEach((childId) => {
          updated[childId] = checked;
          if (parentId == null) {
            data?.forEach((department) => {
              if (department.department === id) {
                department.roles.forEach((role) => {
                  role.employees.forEach((employee) => {
                    updated[`emp_${employee.user_id.toString()}`] = checked;
                  });
                });
              }
            });
          }
        });
      }

      // Update parent
      if (parentId) {
        const parentChecked = data?.every((department) =>
          department.roles.every((role) => {
            if (role.id.toString() === parentId) {
              return role.employees.every(
                (employee) => updated[`emp_${employee.user_id.toString()}`]
              );
            }
            return true;
          })
        );
        updated[parentId] = !!parentChecked;
      }

      const selectedEmployees = Object.keys(updated)
        .filter((key) => updated[key])
        .filter((key) => key.startsWith("emp_"))
        .map((key) => {
          const employeeId = parseInt(key.replace("emp_", ""), 10);
          const employee = data
            ?.flatMap((department) =>
              department.roles.flatMap((role) => role.employees)
            )
            .find((emp) => emp.user_id === employeeId);
          return employee
            ? { id: employee.user_id, color: employee.color }
            : null;
        })
        .filter((employee) => employee !== null);

      onEmployeeSelectionChange(
        selectedEmployees as { id: number; color?: string }[]
      );

      return updated;
    });
  };

  const toggleBranch = (id: string) => {
    setOpenBranches((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    if (data) {
      const initialState: Record<string, boolean> = {};
      const initialOpenState: Record<string, boolean> = {};
      data.forEach((department) => {
        initialState[department.department] = false;
        initialOpenState[department.department] = false; // Initially all branches are open
        department.roles.forEach((role) => {
          initialState[role.id.toString()] = false;
          initialOpenState[role.id.toString()] = true;
          role.employees.forEach((employee) => {
            initialState[`emp_${employee.user_id}`] = false;
            generateColors && (employee.color = generateColors());
          });
        });
      });
      setCheckedItems(initialState);
      setOpenBranches(initialOpenState);
    }
  }, [data]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      {data?.map((item: IDepartmentHierarchy, index) => (
        <div className={classes.department} key={index}>
          <div className={classes.row}>
            <input
              type="checkbox"
              id={item.department}
              checked={!!checkedItems[item.department]}
              onChange={(e) =>
                handleCheck(
                  item.department,
                  e.target.checked,
                  item.roles.map((role) => role.id.toString())
                )
              }
            />
            <label onClick={() => toggleBranch(item.department)}>
              {item.department}
            </label>
            {item.roles.length > 0 && (
              <button onClick={() => toggleBranch(item.department)}>
                {openBranches[item.department] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </button>
            )}
          </div>

          {openBranches[item.department] && (
            <div className={classes.department__roles}>
              {item.roles.map((role) => (
                <div key={role.id}>
                  <div className={classes.row}>
                    <input
                      type="checkbox"
                      id={role.id.toString()}
                      checked={!!checkedItems[role.id.toString()]}
                      onChange={(e) =>
                        handleCheck(
                          role.id.toString(),
                          e.target.checked,
                          role.employees.map(
                            (employee) => `emp_${employee.user_id}`
                          ),
                          item.department
                        )
                      }
                    />
                    <label onClick={() => toggleBranch(role.id.toString())}>
                      {role.name}
                    </label>
                    {role.employees.length > 0 && (
                      <button onClick={() => toggleBranch(role.id.toString())}>
                        {openBranches[role.id.toString()] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </button>
                    )}
                  </div>
                  {openBranches[role.id.toString()] && (
                    <div className={classes.department__roles__employees}>
                      {role.employees.map((employee) => (
                        //employee ROW
                        <div
                          style={{
                            backgroundColor: employee.color,
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "0.5rem",
                          }}
                          className={classes.row}
                          key={employee.user_id}
                        >
                          <input
                            type="checkbox"
                            id={`emp_${employee.user_id}`}
                            checked={!!checkedItems[`emp_${employee.user_id}`]}
                            onChange={(e) =>
                              handleCheck(
                                `emp_${employee.user_id}`,
                                e.target.checked,
                                [],
                                role.id.toString()
                              )
                            }
                          />
                          <label>{employee.full_name}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default RoleEmployeeCheckbox;
