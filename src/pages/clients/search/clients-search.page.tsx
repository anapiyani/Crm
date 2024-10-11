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
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import SearchFilterCard from "@/components/search-filter-card/search-filter-card";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISearchFormData } from "@/ts/employee.interface";
import { useQuery } from "@tanstack/react-query";
import { searchEmployee } from "@/service/employee/employee.service";
import { useState } from "react";
import { Link } from "react-router-dom";
import getUserAge from "@/utils/getUserAge";

const ClientSearch = () => {
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<ISearchFormData>();
  const [searchParams, setSearchParams] = useState<ISearchFormData>({
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
    role: "customer",
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

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: customersData,
    refetch: refetchCustomerData,
    isPending: customerPending,
    isError: customerError,
  } = useQuery({
    queryKey: ["employeeData", searchParams],
    queryFn: () => searchEmployee(searchParams),
  });

  const onSubmitSearch: SubmitHandler<ISearchFormData> = async (data) => {
    setSearchParams({
      ...data,
      role: "customer",
      page: 1,
      page_size: pageSize,
    });
    setPage(1);
    refetchCustomerData();
  };

  const onResetForm = () => {
    reset();
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    setSearchParams((prev) => ({
      ...prev,
      page: value,
    }));
    refetchCustomerData();
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<{}>,
    newSize: number,
  ) => {
    setPageSize(newSize);
    setSearchParams((prev) => ({
      ...prev,
      page_size: newSize,
      page: 1,
    }));
    setPage(1);
    refetchCustomerData();
  };

  return (
    <div className={classes["main"]}>
      <div className={classes["main__wrapper"]}>
        <BreadcrumbsCustom />
        <h1 className={classes["main__title"]}>Расширенный поиск клиентов</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmitSearch)}>
        <div className={classes["main__upper"]}>
          <div className={classes["main__upper__main"]}>
            <SearchFilterCard
              title={"Основные данные"}
              openEnabled={false}
              children={
                <div className={classes["main__upper__card"]}>
                  <VerticalTextField
                    label="Карта"
                    placeholder="Введите номер карты"
                    {...register("card_number")}
                  />

                  <VerticalTextField
                    label="ФИО"
                    placeholder="Введите имя"
                    {...register("search")}
                  />

                  <VerticalTextField
                    label="Телефон"
                    {...register("phone_number")}
                    placeholder="Введите номер"
                  />

                  <VerticalTextField
                    label="WhatsApp"
                    {...register("whatsapp")}
                    placeholder="Введите номер WhatsApp"
                  />
                </div>
              }
            ></SearchFilterCard>
            <SearchFilterCard
              title={"Доп. информация"}
              openEnabled={false}
              children={
                <div className={classes["main__upper__card"]}>
                  <VerticalTextField
                    label="ID"
                    placeholder="Введите ID клиента"
                    {...register("user_id")}
                  />

                  <VerticalTextField
                    label="Email"
                    placeholder="Введите email"
                    {...register("email")}
                  />

                  <VerticalTextField
                    label="1-e посещение"
                    placeholder="С"
                    placeholderOptional="По"
                    type="double"
                    onChangeFrom={(e) => {
                      setValue("first_visit_from", e.target.value);
                    }}
                    onChangeTo={(e) => {
                      setValue("first_visit_to", e.target.value);
                    }}
                  />

                  <VerticalTextField
                    label="Дата рождения"
                    placeholder="С"
                    placeholderOptional="По"
                    type="double"
                    onChangeFrom={(e) => {
                      setValue("date_of_birth_from", e.target.value);
                    }}
                    onChangeTo={(e) => {
                      setValue("date_of_birth_to", e.target.value);
                    }}
                  />

                  <VerticalTextField
                    label="Возраст"
                    placeholder="С"
                    placeholderOptional="По"
                    type="double"
                    onChangeFrom={(e) => {
                      setValue("age_from", e.target.value);
                    }}
                    onChangeTo={(e) => {
                      setValue("age_to", e.target.value);
                    }}
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
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "1.4rem",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={watch("gender") === "male"}
                              value="male"
                              onChange={() => setValue("gender", "male")}
                              size="large"
                            />
                          }
                          label="Муж"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "1.4rem",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={watch("gender") === "female"}
                              value="female"
                              onChange={() => setValue("gender", "female")}
                              size="large"
                            />
                          }
                          label="Жен"
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <VerticalTextField
                    label="Кл. сотрудн."
                    placeholder="Выберите сотрудника"
                  />
                </div>
              }
            ></SearchFilterCard>
          </div>
          {/* <div className={classes["main__upper__position"]}>
            <SearchFilterCard
              title={"Категория"}
              children={<div className={classes["main__upper__card"]}></div>}
            ></SearchFilterCard>
            <SearchFilterCard
              title={"Род занятий"}
              children={<div className={classes["main__upper__card"]}></div>}
            ></SearchFilterCard>
            <SearchFilterCard
              title={"Источник привл."}
              children={<div className={classes["main__upper__card"]}></div>}
            ></SearchFilterCard>
          </div> */}
          <div className={classes["main__upper__reviews"]}>
            <SearchFilterCard
              title={"Отзывы"}
              openEnabled={false}
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
          <Button onClick={onResetForm} type="reset" variant="outlined">
            Сбросить
          </Button>
          <Button type="submit" variant="contained">
            Искать
          </Button>
        </div>
      </form>
      <Divider />
      <div className={classes["main__lower"]}>
        <div className={classes["main__lower__container"]}>
          <div className={classes["main__lower__container__row"]}>
            <p className={classes["main__lower__container__label"]}>
              Показано {customersData?.results.length || 0} из{" "}
              {customersData?.count || 0} записей
            </p>
            <div>
              <div className={classes["tableSettings"]}>
                Показывать
                <Autocomplete
                  size="small"
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      padding: "0px 0px 0px 0px",
                      fontSize: "1.4rem",
                    },
                  }}
                  options={[10, 20, 50, 100]}
                  value={pageSize}
                  onChange={(event, newValue) =>
                    handlePageSizeChange(event, newValue!)
                  }
                  renderInput={(params) => (
                    <TextField
                      sx={{ height: "30px" }}
                      {...params}
                      className={"main__lower__auto__input"}
                    />
                  )}
                />
                записей
              </div>
            </div>
            <Pagination
              count={Math.ceil((customersData?.count || 0) / pageSize)}
              page={page}
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
                <TableCell>ФИО</TableCell>
                <TableCell>№ карты</TableCell>
                <TableCell>Телефон</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell>Возраст</TableCell>
                <TableCell>Дата рождения</TableCell>
                <TableCell>Пол</TableCell>
                <TableCell>Род занятий</TableCell>
              </TableRow>
            </TableHead>
            {customersData && customersData.results.length > 0 ? (
              <TableBody>
                {customersData.results.map((customer, index) => (
                  <TableRow key={index}>
                    <TableCell>{customer.user_id}</TableCell>
                    <TableCell>
                      <Link
                        className={classes.link}
                        to={`/clients/${customer.user_id}`}
                      >
                        {customer.last_name ? customer.last_name : "-"}{" "}
                        {customer.first_name ? customer.first_name : "-"}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {customer.card_number ? customer.card_number : "-"}
                    </TableCell>
                    <TableCell>
                      {customer.phone_number ? customer.phone_number : "-"}
                    </TableCell>
                    <TableCell>
                      {customer.category ? customer.category : "-"}
                    </TableCell>
                    <TableCell>{getUserAge(customer.date_of_birth)}</TableCell>
                    <TableCell>
                      {customer.date_of_birth ? customer.date_of_birth : "-"}
                    </TableCell>
                    <TableCell>
                      {customer.gender ? customer.gender : "-"}
                    </TableCell>
                    <TableCell>
                      {customer.occupation ? customer.occupation : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : null}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ClientSearch;
