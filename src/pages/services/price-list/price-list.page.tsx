import React, { useState } from "react";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import {
  Divider,
  Radio,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import classes from "./styles.module.scss";
import TableService from "@/components/tables/table-service/table-service";
import { useQuery } from "@tanstack/react-query";
import {
  getHierarchy,
  getRolesByDepartments,
} from "@/service/hierarchy/hierarchy.service";
import { IServiceCategory } from "@/ts/service.interface";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import { Label } from "recharts";

// Example static table headers and data
const tableHeaders = [
  "Парикмахерский зал",
  "Стоимость",
  "Стоимость от",
  "Стоимость до",
  "Короткие волосы",
  "Средние волосы",
  "Длинные волосы",
  "Корни",
];

const tableData = [
  {
    id: 1,
    category: "Парикмахерский зал",
    color: "#E0F7FA",
    items: [
      {
        name: "Стрижка",
        cost: "500",
        costFrom: "300",
        costTo: "700",
        shortHair: "200",
        mediumHair: "300",
        longHair: "400",
        roots: "100",
      },
      {
        name: "Окрашивание",
        cost: "1500",
        costFrom: "1000",
        costTo: "2000",
        shortHair: "200",
        mediumHair: "300",
        longHair: "400",
        roots: "100",
      },
    ],
  },
];

const ServicePriceList = () => {
  const [selectedDepartment, setSelectedDepartment] =
    useState<IServiceCategory | null>(null);
  const [selectedSection, setSelectedSection] =
    useState<IServiceCategory | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<IServiceCategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<IServiceCategory | null>(null);
  const [roles, setRoles] = useState<string[]>([]);

  const {
    data: hierarchyData,
    isLoading: hierarchyLoading,
    error,
  } = useQuery({
    queryKey: ["hierarchyData"],
    queryFn: getHierarchy,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: rolesData, isLoading: rolesLoading } = useQuery({
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
    return matchedDepartment
      ? matchedDepartment.roles.map((role) => role.name)
      : [];
  };

  const handleSelectionChange = (level: string, id: number) => {
    if (level === "department") {
      const department = hierarchyData?.find((dep) => dep.id === id);
      setSelectedDepartment(department || null);
      setSelectedSection(null);
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setRoles([]);
    } else if (level === "section" && selectedDepartment) {
      const section = selectedDepartment.children?.find((sec) => sec.id === id);
      setSelectedSection(section || null);
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setRoles(findRolesForDepartment(selectedDepartment?.name ?? null));
    } else if (level === "category" && selectedDepartment) {
      const category = selectedDepartment.children?.find(
        (cat) => cat.id === id
      );
      setSelectedCategory(category || null);
      setSelectedSubcategory(null);
      setRoles([]);
      if (!category?.children || category.children.length === 0) {
        setRoles(findRolesForDepartment(selectedDepartment?.name ?? null));
      }
    } else if (level === "subcategory" && selectedCategory) {
      const subcategory = selectedCategory.children?.find(
        (subcat) => subcat.id === id
      );
      setSelectedSubcategory(subcategory || null);
      setRoles(findRolesForDepartment(selectedDepartment?.name ?? null));
    }
  };

  const getLabelForLevel = (level: "section" | "category" | "subcategory") => {
    switch (level) {
      case "section":
        return "Секция";
      case "category":
        return "Категория";
      case "subcategory":
        return "Подкатегория";
      default:
        return "";
    }
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

          {selectedDepartment && selectedDepartment.children?.length > 0 && (
            <div>
              <FormLabel>
                <h5 className={classes["price__upper__header"]}>
                  {selectedDepartment.children[0].level === "section"
                    ? getLabelForLevel("section")
                    : getLabelForLevel("category")}
                </h5>
                <Divider sx={{ marginBottom: "1rem" }} />
              </FormLabel>
              <RadioGroup
                aria-labelledby={
                  selectedDepartment.children[0].level === "section"
                    ? "section"
                    : "category"
                }
                className={classes["price__upper__radio-container"]}
                onChange={(e) =>
                  handleSelectionChange(
                    selectedDepartment.children[0].level,
                    parseInt(e.target.value)
                  )
                }
              >
                {selectedDepartment.children.map((child) => (
                  <FormControlLabel
                    key={child.id}
                    value={child.id.toString()}
                    control={<Radio />}
                    label={
                      <span className={classes["price__upper__radio-text"]}>
                        {child.name}
                      </span>
                    }
                  />
                ))}
              </RadioGroup>
            </div>
          )}

          {selectedCategory && selectedCategory.children?.length > 0 && (
            <div>
              <FormLabel>
                <h5 className={classes["price__upper__header"]}>
                  {getLabelForLevel("subcategory")}
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
              >
                {roles.map((role, index) => (
                  <FormControlLabel
                    key={index}
                    value={role}
                    control={<Radio />}
                    label={
                      <span className={classes["price__upper__radio-text"]}>
                        {role}
                      </span>
                    }
                  />
                ))}
              </RadioGroup>
            </div>
          )}
          <div>
            <FormLabel>
              <h5 className={classes["price__upper__header"]}>Акции</h5>
              <Divider sx={{ marginBottom: "1rem" }} />
              <CustomAutoComplete
                name="actiya"
                selectValue={"label"}
                options={[
                  { label: "Без учета акций", value: "Без учета акций" },
                  { label: "С акцией", value: "С акцией" },
                ]}
                size="small"
                labelClassName={classes["u-label"]}
                value={{ label: "Без учета акций", value: "Без учета акций" }}
              />
            </FormLabel>
          </div>
        </div>
      </FormControl>

      <div>
        <TableService headers={tableHeaders} data={tableData} />
      </div>
    </div>
  );
};

export default ServicePriceList;
