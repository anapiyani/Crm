import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";

import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import classes from "./styles.module.scss";
import SearchFilterCard from "./components/search-filter-card";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import { useState } from "react";

function IndeterminateCheckbox() {
  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label="Parent"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  );
}

// interface TabData {
//   to: string;
//   icon: typeof HomeOutlined;
//   label: string;
// }

const EmployeeSearch = () => {
  // const tabsData: TabData[] = [
  //   { to: "/employees", icon: HomeOutlined, label: "Обзор" },
  //   { to: "/employees/visit", icon: ExitToAppOutlined, label: "Посещения" },
  //   {
  //     to: "/employees/balance",
  //     icon: AccountBalanceWalletOutlined,
  //     label: "Зарплата, штрафы, премии, авансы",
  //   },
  //   {
  //     to: "/employees/reviews",
  //     icon: WarningAmberOutlined,
  //     label: "Отзывы / жалобы",
  //   },
  //   {
  //     to: "/employees/work-schedule",
  //     icon: CalendarMonthOutlined,
  //     label: "график работы",
  //   },
  // ];

  return (
    <div className={classes["main"]}>
      <BreadcrumbsCustom></BreadcrumbsCustom>
      <h1 className={classes["main__title"]}>Расширенный поиск</h1>
      <div className={classes["main__upper"]}>
        <div className={classes["main__upper__main"]}>
          <SearchFilterCard
            title={"Основные данные"}
            children={
              <div className={classes["main__upper__card"]}>
                <VerticalTextField label={"ФИО"} placeholder="Введите имя" />
                <VerticalTextField
                  label={"Телефон"}
                  placeholder="Введите номер"
                />
                <VerticalTextField
                  label={"ID сотрудника"}
                  placeholder="Введите ID"
                />
              </div>
            }
          ></SearchFilterCard>
        </div>
        <div className={classes["main__upper__position"]}>
          <SearchFilterCard
            classNameUnique="container__searchFilterCard"
            title={"Должность"}
            children={
              <div className={classes["main__upper__card"]}>
                <IndeterminateCheckbox />
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
        <div className={classes["main__upper__external"]}>
          <SearchFilterCard
            title={"Доп. информация"}
            children={
              <div className={classes["main__upper__card"]}>
                <VerticalTextField
                  label={"Email"}
                  placeholder="Введите email "
                />
                <VerticalTextField
                  label={"Работает"}
                  placeholder="С"
                  placeholderOptional="По"
                  type="double"
                  doubleDivier="-"
                />
                <VerticalTextField
                  label={"Дата рождения"}
                  placeholder="С"
                  placeholderOptional="По"
                  type="double"
                  doubleDivier="-"
                />
                <VerticalTextField
                  label={"Возраст"}
                  placeholder="С"
                  placeholderOptional="По"
                  type="double"
                  doubleDivier="-"
                />
                <div className={classes["main__upper__checkboxes"]}>
                  <p>Пол</p>
                  <FormGroup sx={{ flexDirection: "row" }}>
                    <FormControlLabel control={<Checkbox />} label="Муж" />
                    <FormControlLabel control={<Checkbox />} label="Жен" />
                  </FormGroup>
                </div>
                <div className={classes["main__upper__autocomplete"]}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    options={[
                      { label: "Option 1", value: "1" },
                      { label: "Option 2", value: "2" },
                      { label: "Option 3", value: "3" },
                      { label: "Option 4", value: "4" },
                      { label: "Option 5", value: "5" },
                    ]}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <VerticalTextField
                        label={"Статус"}
                        placeholder="Выберите"
                        {...params}
                      />
                    )}
                  />
                </div>
              </div>
            }
          ></SearchFilterCard>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSearch;
