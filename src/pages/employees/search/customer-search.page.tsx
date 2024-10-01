import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";

import {
  Alert,
  Autocomplete,
  Button,
  Checkbox,
  CircularProgress,
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
import SearchFilterCard from "@/components/search-filter-card/search-filter-card";
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
import { ISearchFormData } from "@/ts/employee.interface";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";

interface IOption {
  label: string;
  value: number;
}

const EmployeeSearch = () => {
  const [formData, setFormData] = useState<ISearchFormData>({
    search: "",
    phone_number: "",
    whatsapp: "",
    user_id: "",
    email: "",
    is_active: null,
    employmentDateFrom: "",
    employmentDateTo: "",
    age_from: "",
    age_to: "",
    gender: "",
    role: "employee",
    roleEmployee: "",
    reviewFrom: "",
    reviewAbout: "",
    reviewDateFrom: "",
    reviewDateTo: "",
    page: 1,
    page_size: 10,
    works_from: "",
    works_to: "",
    date_of_birth_from: "",
    date_of_birth_to: "",
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
  }, [pageSize.value]);

  const handleFormDataChange = (field: keyof ISearchFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    handleFormDataChange("page", value);
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
    console.log(formData);
    searchEmployee(formData);
    refetchEmployeeData();
  };

  const handleAutocompleteChange = (value: any, fieldName: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // const handleRangeChange = (
  //   fieldPrefix: string,
  //   value: string,
  //   boundary:
  //     | "age_from"
  //     | "age_to"
  //     | "works_from"
  //     | "works_to"
  //     | "date_of_birth_from"
  //     | "date_of_birth_to",
  // ) => {
  //   console.log(fieldPrefix, value, boundary);
  //   setFormData((prev) => ({
  //     ...prev,
  //     [`${fieldPrefix}${boundary}`]: value,
  //   }));
  // };

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

  const handleClear = () => {
    setFormData({
      search: "",
      phone_number: "",
      whatsapp: "",
      user_id: "",
      email: "",
      is_active: null,
      employmentDateFrom: "",
      employmentDateTo: "",
      age_from: "",
      age_to: "",
      gender: "",
      role: "employee",
      roleEmployee: "",
      reviewFrom: "",
      reviewAbout: "",
      reviewDateFrom: "",
      reviewDateTo: "",
      page: 1,
      page_size: 10,
      works_from: "",
      works_to: "",
      date_of_birth_from: "",
      date_of_birth_to: "",
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
  }, [formData.page_size, formData.page]);

  const getUserAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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
            openEnabled={true}
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
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: event.target.value,
                    }))
                  }
                />

                <VerticalTextField
                  label="ID сотрудника"
                  name="user_id"
                  placeholder="Введите ID"
                  value={formData.user_id}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      user_id: event.target.value,
                    }))
                  }
                />
              </div>
            }
          ></SearchFilterCard>
          <SearchFilterCard
            title={"Доп. информация"}
            openEnabled={true}
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
                  doubleDivier="-"
                  onChangeFrom={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [`works_from`]: e.target.value,
                    }))
                  }
                  onChangeTo={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [`works_to`]: e.target.value,
                    }))
                  }
                />

                {/* <VerticalTextField
                  label="Дата рождения"
                  placeholder="С"
                  placeholderOptional="По"
                  type="double"
                  doubleDivier="-"
                  onChangeFrom={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [`date_of_birth_from`]: e.target.value,
                    }))
                  }
                  onChangeTo={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [`date_of_birth_to`]: e.target.value,
                    }))
                  }
                /> */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    gap: "10px",
                  }}
                >
                  <p style={{ fontSize: "1.6rem" }}>Дата рождения</p>
                  <CustomDatePicker
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [`date_of_birth_from`]: dayjs(e.target.value).format(
                          "DD.MM.YYYY"
                        ),
                      }))
                    }
                    style={{ width: "190px" }}
                  />
                  <p>-</p>
                  <CustomDatePicker
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        [`date_of_birth_to`]: dayjs(e.target.value).format(
                          "DD.MM.YYYY"
                        ),
                      }));
                    }}
                    style={{ width: "190px" }}
                  />
                </div>

                <VerticalTextField
                  label="Возраст"
                  placeholder="С"
                  placeholderOptional="По"
                  type="double"
                  doubleDivier="-"
                  onChangeFrom={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [`age_from`]: e.target.value,
                    }))
                  }
                  onChangeTo={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [`age_to`]: e.target.value,
                    }))
                  }
                />
                <div className={classes["main__upper__checkboxes"]}>
                  <p>Пол</p>
                  <div
                    style={{
                      width: "40rem",
                    }}
                  >
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
                                gender:
                                  prev.gender === "female" ? "" : "female",
                              }))
                            }
                          />
                        }
                        label="Жен"
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className={classes["main__upper__autocomplete"]}>
                  <div
                    className={classes["main__upper__autocomplete__container"]}
                  >
                    <Autocomplete
                      sx={{
                        width: "100%",
                      }}
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
                      size="medium"
                    />
                  </div>
                </div>
              </div>
            }
          ></SearchFilterCard>
        </div>
        <div className={classes["main__upper__position"]}>
          <SearchFilterCard
            title={"Должность"}
            openEnabled={true}
            children={
              <div className={classes["main__upper__card"]}>
                {departmentData?.map((item: IDepartmentData) =>
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
            openEnabled={true}
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
        <Button onClick={handleClear} variant="outlined">
          Сбросить
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Искать
        </Button>
      </div>
      <Divider />
      {employeeError ? (
        <Alert severity="error">Ошибка при получении данных!</Alert>
      ) : null}
      {employeePending ? (
        <CircularProgress className={classes.loading} />
      ) : (
        <div className={classes["main__lower"]}>
          <div className={classes["main__lower__container"]}>
            <div className={classes["main__lower__container__row"]}>
              <p className={classes["main__lower__container__label"]}>
                Показано {employeeData?.results.length} из {employeeData?.count}{" "}
                записей
              </p>
              <div>
                <div className={classes["tableSettings"]}>
                  Показывать
                  <select
                    name="pageSize"
                    id="pageSize"
                    value={formData.page_size}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        page_size: parseInt(event.target.value),
                      }))
                    }
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  записей
                </div>
              </div>
              <Pagination
                count={
                  employeeData
                    ? Math.ceil(employeeData.count / formData.page_size)
                    : 1
                }
                page={formData.page}
                onChange={handlePageChange}
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
                {employeeData!.results?.length > 0 ? (
                  employeeData!.results.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.user_id}</TableCell>
                      <TableCell>
                        <Link
                          className={classes.name_link}
                          to={`/employees/${row.user_id}`}
                          state={{
                            username: `${row.first_name} ${row.last_name}`,
                          }}
                        >
                          {row.first_name} {row.last_name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {row.phone_number} <br /> {row.email}
                      </TableCell>
                      <TableCell>{getUserAge(row.date_of_birth)}</TableCell>
                      <TableCell>
                        {row.date_of_birth
                          ? dayjs(row.date_of_birth).format("DD.MM.YYYY")
                          : "-"}
                      </TableCell>
                      {/* position */}
                      <TableCell>{row.position.name}</TableCell>
                      <TableCell>
                        <Button>
                          <TextsmsOutlinedIcon sx={{ fontSize: "1.6rem" }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} style={{ textAlign: "center" }}>
                      Нет данных по вашему запросу
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSearch;
