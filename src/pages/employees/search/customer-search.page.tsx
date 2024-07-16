import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";

import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import classes from "./styles.module.scss";
import SearchFilterCard from "./components/search-filter-card";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import {
  ChildCheckbox,
  TriStateCheckbox,
} from "@/components/intermediate-checkbox/intermediate-checkbox";
import { useEffect, useState } from "react";
import { getDepartment } from "@/service/department/department.service";
import { searchEmployee } from "@/service/employee/employee.service";
import { useQuery } from "@tanstack/react-query";
import { IDepartmentData } from "@/ts/departments.interface";
import { ISearchFormData, IUserDetails } from "@/ts/employee.interface";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";

interface IOption {
  label: string;
  value: number;
}

const EmployeeSearch = () => {
  const [formData, setFormData] = useState<ISearchFormData>({
    search: "",
    phoneNumber: "",
    userId: "",
    email: "",
    isActive: null,
    employmentDateFrom: "",
    employmentDateTo: "",
    birthDateFrom: "",
    birthDateTo: "",
    ageFrom: "",
    ageTo: "",
    gender: "",
    role: "employee",
    roleEmployee: "",
    reviewFrom: "",
    reviewAbout: "",
    reviewDateFrom: "",
    reviewDateTo: "",
    page: 1,
    page_size: 10,
  });
  const [selectedRoles, setSelectedRoles] = useState(
    formData.roleEmployee.split(", ").filter(Boolean)
  );
  const [pageSize, setPageSize] = useState<IOption>({ label: "10", value: 10 });
  const [page, setPage] = useState(1);

  const pageSizeOptions: IOption[] = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

  useEffect(() => {
    const defaultSize = pageSizeOptions.find((o) => o.value === pageSize.value);
    if (defaultSize) setPageSize(defaultSize);
  }, [pageSizeOptions]);

  const handleFormDataChange = (field: keyof ISearchFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const {
    data: departmentData,
    isPending: departmentPending,
    isError: departmentError,
  } = useQuery({
    queryKey: ["departmentData"],
    queryFn: getDepartment,
    staleTime: 300,
  });

  const {
    data: employeeData,
    refetch: refetchEmployeeData,
    isPending: employeePending,
    isError: employeeError,
  } = useQuery({
    queryKey: ["employeeData", page, pageSize],
    queryFn: () => searchEmployee(formData),
    enabled: false,
  });

  const handleSubmit = () => {
    searchEmployee(formData);
    refetchEmployeeData();
    console.log(employeeData);
  };

  const handleAutocompleteChange = (value: any, fieldName: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleRangeChange = (
    fieldPrefix: string,
    value: string,
    boundary: "From" | "To"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [`${fieldPrefix}${boundary}`]: value,
    }));
  };

  const handleCheckboxChange = (role: string, isChecked: boolean) => {
    setSelectedRoles((prev) => {
      const set = new Set(prev);
      if (isChecked) {
        set.add(role);
      } else {
        set.delete(role);
      }
      return Array.from(set);
    });
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      roleEmployee: selectedRoles.join(", "),
    }));
  }, [selectedRoles]);

  useEffect(() => {
    refetchEmployeeData();
  }, [formData.page_size]);

  return (
    <div className={classes["main"]}>
      <div className={classes["main__wrapper"]}>
        <BreadcrumbsCustom></BreadcrumbsCustom>
        <h1 className={classes["main__title"]}>Расширенный поиск</h1>
      </div>

      <div className={classes["main__upper"]}>
        <div className={classes["main__upper__main"]}>
          <SearchFilterCard
            title={"Основные данные"}
            children={
              <div className={classes["main__upper__card"]}>
                <VerticalTextField
                  label="ФИО"
                  name="search"
                  placeholder="Введите имя"
                  value={formData.search}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      search: event.target.value,
                    }))
                  }
                />

                <VerticalTextField
                  label="Телефон"
                  name="phoneNumber"
                  placeholder="Введите номер"
                  value={formData.phoneNumber}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: event.target.value,
                    }))
                  }
                />

                <VerticalTextField
                  label="ID сотрудника"
                  name="userId"
                  placeholder="Введите ID"
                  value={formData.userId}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      userId: event.target.value,
                    }))
                  }
                />
              </div>
            }
          ></SearchFilterCard>
          <SearchFilterCard
            title={"Доп. информация"}
            children={
              <div className={classes["main__upper__card"]}>
                <VerticalTextField
                  label="Email"
                  name="email"
                  placeholder="Введите email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />

                <VerticalTextField
                  label="Работает"
                  placeholder="С"
                  placeholderOptional="По"
                  type="double"
                  onChangeFrom={(e) =>
                    handleRangeChange("employmentDate", e.target.value, "From")
                  }
                  onChangeTo={(e) =>
                    handleRangeChange("employmentDate", e.target.value, "To")
                  }
                />

                <VerticalTextField
                  label="Дата рождения"
                  placeholder="С"
                  placeholderOptional="По"
                  type="double"
                  onChangeFrom={(e) =>
                    handleRangeChange("birthDate", e.target.value, "From")
                  }
                  onChangeTo={(e) =>
                    handleRangeChange("birthDate", e.target.value, "To")
                  }
                />

                <VerticalTextField
                  label="Возраст"
                  placeholder="С"
                  placeholderOptional="По"
                  type="double"
                  onChangeFrom={(e) =>
                    handleRangeChange("age", e.target.value, "From")
                  }
                  onChangeTo={(e) =>
                    handleRangeChange("age", e.target.value, "To")
                  }
                />
                <div className={classes["main__upper__checkboxes"]}>
                  <p>Пол</p>
                  <FormGroup sx={{ flexDirection: "row" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.gender === "male"}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              gender: prev.gender === "male" ? "" : "male",
                            }))
                          }
                        />
                      }
                      label="Муж"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.gender === "female"}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              gender: prev.gender === "female" ? "" : "female",
                            }))
                          }
                        />
                      }
                      label="Жен"
                    />
                  </FormGroup>
                </div>
                <div className={classes["main__upper__autocomplete"]}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    options={[
                      { label: "Option 1", value: "1" },
                      { label: "Option 2", value: "2" },
                      { label: "Option 3", value: "3" },
                    ]}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) =>
                      handleAutocompleteChange(newValue?.value, "role")
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Статус" />
                    )}
                  />
                </div>
              </div>
            }
          ></SearchFilterCard>
        </div>
        <div className={classes["main__upper__position"]}>
          <SearchFilterCard
            title={"Должность"}
            children={
              <div className={classes["main__upper__card"]}>
                {departmentData?.results.map((item: IDepartmentData) =>
                  item.role.length > 0 ? (
                    <TriStateCheckbox key={item.name} label={item.name}>
                      {item.role.map((position) => (
                        <ChildCheckbox
                          key={position.name}
                          label={position.name}
                          parentChecked={selectedRoles.includes(position.name)}
                          onChildChange={(isChecked) => console.log(isChecked)}
                          onInputChange={(isChecked) =>
                            handleCheckboxChange(
                              position.name,
                              isChecked ? true : false
                            )
                          }
                        />
                      ))}
                    </TriStateCheckbox>
                  ) : null
                )}
              </div>
            }
          ></SearchFilterCard>
        </div>
        <div className={classes["main__upper__reviews"]}>
          <SearchFilterCard
            title={"Отзывы"}
            children={
              <div className={classes["main__upper__card"]}>
                <VerticalTextField
                  label="Отзыв от"
                  placeholder="Введите ФИО"
                  placeholderOptional="Введите телефон"
                  type="double"
                  doubleDivier="/"
                />
                <VerticalTextField
                  label={"Отзыв о"}
                  placeholder="Введите имя"
                />
                <VerticalTextField
                  label={"Дата"}
                  placeholder="С"
                  placeholderOptional="По"
                  type="double"
                  doubleDivier="-"
                />
              </div>
            }
          ></SearchFilterCard>
        </div>
      </div>
      <div className={classes["main__upper__buttons"]}>
        <Button variant="outlined">Сбросить</Button>
        <Button onClick={handleSubmit} variant="contained">
          Искать
        </Button>
      </div>
      <Divider />
      <div className={classes["main__lower"]}>
        <div className={classes["main__lower__container"]}>
          <div className={classes["main__lower__container__row"]}>
            <p className={classes["main__lower__container__label"]}>
              Показано {employeeData?.results.length} из {employeeData?.count}{" "}
              записей
            </p>
            <div>
              <p>
                Показывать
                <Autocomplete
                  size="small"
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "0px 0px 0px 0px",
                      fontSize: "1.4rem",
                    },
                  }}
                  options={pageSizeOptions}
                  getOptionLabel={(option) => option.label}
                  value={pageSizeOptions.find(
                    (option) => option.value === formData.page_size
                  )}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      handleFormDataChange("page_size", newValue.value);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{ height: "30px" }}
                      {...params}
                      className={"main__lower__auto__input"}
                    />
                  )}
                />
                записей
              </p>
            </div>
            <Pagination
              count={11}
              variant="outlined"
              shape="rounded"
              boundaryCount={1}
              color="primary"
            />
          </div>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Сотрудник</TableCell>
                <TableCell>Контакты</TableCell>
                <TableCell>Возраст</TableCell>
                <TableCell>Дата рождения</TableCell>
                <TableCell>Должность</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeData?.results.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {row.first_name} {row.last_name}
                  </TableCell>
                  <TableCell>
                    {row.phone_number} <br /> {row.email}
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>{row.date_of_birth}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <Button>
                      <TextsmsOutlinedIcon sx={{ fontSize: "1.6rem" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSearch;
