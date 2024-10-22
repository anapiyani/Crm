import React, { useEffect, useState } from "react";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import classes from "./styles.module.scss";
import TableService from "@/components/tables/table-service/table-service";
import { useQuery } from "@tanstack/react-query";
import {
  getHierarchy,
  getRolesByDepartments,
} from "@/service/hierarchy/hierarchy.service";
import { IServiceCategory, IServicePriceCurrent } from "@/ts/service.interface";
import { getServicePriceCurant } from "@/service/services/services.service";
import { useTraverseServicePrice } from "../hooks/useTraverseServicePrice";

const ServicePriceList = () => {
  const [selectedDepartment, setSelectedDepartment] =
    useState<IServiceCategory | null>(null);
  const [selectedSection, setSelectedSection] =
    useState<IServiceCategory | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<IServiceCategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<IServiceCategory | null>(null);
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const [tableData, setTableData] = useState<IServicePriceCurrent[]>([]);
  const [hasParameters, setHasParameters] = useState(false);

  const { data: hierarchyData, isLoading: hierarchyLoading } = useQuery({
    queryKey: ["hierarchyData"],
    queryFn: getHierarchy,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: rolesData } = useQuery({
    queryKey: ["roles"],
    queryFn: getRolesByDepartments,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const findRolesForDepartment = (departmentName: string | null) => {
    if (!rolesData || !departmentName) return [];
    const matchedDepartment = rolesData.find(
      (roleDep) => roleDep.department === departmentName
    );
    return matchedDepartment ? matchedDepartment.roles : [];
  };

  const handleSelectionChange = (level: string, id: number) => {
    switch (level) {
      case "department":
        const department = hierarchyData?.find((dep) => dep.id === id);
        setSelectedDepartment(department || null);
        setSelectedSection(null);
        setSelectedCategory(null);
        setSelectedSubcategory(null);
        setSelectedRole(null);
        if (!department?.children || department.children.length === 0) {
          setRoles(findRolesForDepartment(department?.name ?? null));
        } else {
          setRoles([]);
        }
        break;

      case "section":
        const section = selectedDepartment?.children?.find(
          (sec) => sec.id === id
        );
        setSelectedSection(section || null);
        setSelectedCategory(null);
        setSelectedSubcategory(null);
        setSelectedRole(null);
        if (!section?.children || section.children.length === 0) {
          setRoles(findRolesForDepartment(selectedDepartment?.name ?? null));
        } else {
          setRoles([]);
        }
        break;

      case "category":
        const category = selectedSection
          ? selectedSection.children?.find((cat) => cat.id === id)
          : selectedDepartment?.children?.find((cat) => cat.id === id);
        setSelectedCategory(category || null);
        setSelectedSubcategory(null);
        setSelectedRole(null);
        if (!category?.children || category.children.length === 0) {
          setRoles(findRolesForDepartment(selectedDepartment?.name ?? null));
        } else {
          setRoles([]);
        }
        break;

      case "subcategory":
        const subcategory = selectedCategory?.children?.find(
          (subcat) => subcat.id === id
        );
        setSelectedSubcategory(subcategory || null);
        setSelectedRole(null);
        setRoles(findRolesForDepartment(selectedDepartment?.name ?? null));
        break;

      default:
        break;
    }
  };

  const handleRoleChange = (roleId: number) => {
    const selected = roles.find((role) => role.id === roleId);
    setSelectedRole(selected?.id || null);
  };

  useEffect(() => {
    if (selectedDepartment) {
      getServicePriceCurant(
        selectedDepartment.id,
        selectedCategory?.id,
        selectedSection?.id,
        selectedSubcategory?.id,
        selectedRole?.toString() ?? ""
      )
        .then((response) => {
          const { items, hasParameters } = traverse(response);
          setTableData(items);
          setHasParameters(hasParameters);
        })
        .catch((error) => {
          console.error("Error fetching service price data:", error);
        });
    }
  }, [
    selectedDepartment,
    selectedSection,
    selectedCategory,
    selectedSubcategory,
    selectedRole,
    roles,
  ]);

  const { traverse } = useTraverseServicePrice();

  const renderTable = () => {
    return (
      <div style={{ marginTop: "2rem" }}>
        <TableService
          data={tableData}
          title={selectedDepartment?.name ?? "Отдел"}
          hasParameters={hasParameters}
          tableHeaders={
            hasParameters
              ? [
                  {
                    name: tableData[0] ? tableData[0].title : "Отдел",
                    key: "title",
                  },
                  { name: "Стоимость", key: "cost" },
                  { name: "Стоимость от", key: "costFrom" },
                  { name: "Стоимость до", key: "costTo" },
                  { name: "Короткие от 10 см", key: "shortHair" },
                  { name: "Средние 15-20 см", key: "mediumHair" },
                  { name: "Длинные 30-40 см", key: "longHair" },
                  { name: "Очень длинные от 50 см", key: "veryLongHair" },
                ]
              : [
                  {
                    name: tableData[0] ? tableData[0].title : "Отдел",
                    key: "title",
                  },
                  { name: "Стоимость", key: "cost" },
                ]
          }
        />
      </div>
    );
  };

  return (
    <div className={classes["price"]}>
      <BreadcrumbsCustom />

      <FormControl sx={{ width: "100%" }}>
        <div className={classes["price__upper"]}>
          <div>
            <FormLabel id="department">
              <h5 className={classes["price__upper__header"]}>Отдел</h5>
              <Divider sx={{ marginBottom: "1rem" }} />
            </FormLabel>
            <RadioGroup
              aria-labelledby="department"
              className={classes["price__upper__radio-container"]}
              onChange={(e) =>
                handleSelectionChange("department", parseInt(e.target.value))
              }
            >
              {!hierarchyLoading &&
                hierarchyData?.map((department) => (
                  <FormControlLabel
                    key={department.id}
                    value={department.id.toString()}
                    control={<Radio />}
                    label={
                      <span className={classes["price__upper__radio-text"]}>
                        {department.name}
                      </span>
                    }
                  />
                ))}
            </RadioGroup>
          </div>

          {selectedDepartment &&
            selectedDepartment.children?.some(
              (child) => child.level === "section"
            ) && (
              <div>
                <FormLabel>
                  <h5 className={classes["price__upper__header"]}>Секция</h5>
                  <Divider sx={{ marginBottom: "1rem" }} />
                </FormLabel>
                <RadioGroup
                  aria-labelledby="section"
                  className={classes["price__upper__radio-container"]}
                  onChange={(e) =>
                    handleSelectionChange("section", parseInt(e.target.value))
                  }
                >
                  {selectedDepartment.children.map(
                    (section) =>
                      section.level === "section" && (
                        <FormControlLabel
                          key={section.id}
                          value={section.id.toString()}
                          control={<Radio />}
                          label={
                            <span
                              className={classes["price__upper__radio-text"]}
                            >
                              {section.name}
                            </span>
                          }
                        />
                      )
                  )}
                </RadioGroup>
              </div>
            )}

          {(selectedSection?.children?.some(
            (child) => child.level === "category"
          ) ||
            selectedDepartment?.children?.some(
              (child) => child.level === "category"
            )) && (
            <div>
              <FormLabel>
                <h5 className={classes["price__upper__header"]}>Категория</h5>
                <Divider sx={{ marginBottom: "1rem" }} />
              </FormLabel>
              <RadioGroup
                aria-labelledby="category"
                className={classes["price__upper__radio-container"]}
                onChange={(e) =>
                  handleSelectionChange("category", parseInt(e.target.value))
                }
              >
                {(
                  selectedSection?.children || selectedDepartment?.children
                )?.map(
                  (category) =>
                    category.level === "category" && (
                      <FormControlLabel
                        key={category.id}
                        value={category.id.toString()}
                        control={<Radio />}
                        label={
                          <span className={classes["price__upper__radio-text"]}>
                            {category.name}
                          </span>
                        }
                      />
                    )
                )}
              </RadioGroup>
            </div>
          )}

          {selectedCategory && selectedCategory.children?.length > 0 && (
            <div>
              <FormLabel>
                <h5 className={classes["price__upper__header"]}>
                  Подкатегория
                </h5>
                <Divider sx={{ marginBottom: "1rem" }} />
              </FormLabel>
              <RadioGroup
                aria-labelledby="subcategory"
                className={classes["price__upper__radio-container"]}
                onChange={(e) =>
                  handleSelectionChange("subcategory", parseInt(e.target.value))
                }
              >
                {selectedCategory.children.map((subcategory) => (
                  <FormControlLabel
                    key={subcategory.id}
                    value={subcategory.id.toString()}
                    control={<Radio />}
                    label={
                      <span className={classes["price__upper__radio-text"]}>
                        {subcategory.name}
                      </span>
                    }
                  />
                ))}
              </RadioGroup>
            </div>
          )}

          {roles.length > 0 && (
            <div>
              <FormLabel>
                <h5 className={classes["price__upper__header"]}>Должности</h5>
                <Divider sx={{ marginBottom: "1rem" }} />
              </FormLabel>
              <RadioGroup
                aria-labelledby="roles"
                className={classes["price__upper__radio-container"]}
                onChange={(e) => handleRoleChange(parseInt(e.target.value))}
              >
                {roles.map((role) => (
                  <FormControlLabel
                    key={role.id}
                    value={role.id.toString()}
                    control={<Radio />}
                    label={
                      <span className={classes["price__upper__radio-text"]}>
                        {role.name}
                      </span>
                    }
                  />
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
      </FormControl>
      <Divider sx={{ mt: "2rem" }} />
      {renderTable()}
    </div>
  );
};

export default ServicePriceList;
