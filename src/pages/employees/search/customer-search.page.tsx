import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";

import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import classes from "./styles.module.scss";
import SearchFilterCard from "./components/search-filter-card";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import {
  ChildCheckbox,
  TriStateCheckbox,
} from "@/components/intermediate-checkbox/intermediate-checkbox";
import { useState } from "react";

const EmployeeSearch = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Имя Фамилия",
      contactInfo: "8 800 555 35 35",
      age: 25,
      dateOfBirth: "01.01.1996",
      position: "Массажист",
    },
  ]);

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
                    <FormControlLabel
                      sx={{
                        fontSize: "1.6rem",
                        "& .MuiTypography-root": {
                          fontSize: "1.6rem",
                        },
                      }}
                      control={<Checkbox />}
                      label="Муж"
                    />
                    <FormControlLabel
                      sx={{
                        fontSize: "1.6rem",
                        "& .MuiTypography-root": {
                          fontSize: "1.6rem",
                        },
                      }}
                      control={<Checkbox />}
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
        <div className={classes["main__upper__position"]}>
          <SearchFilterCard
            title={"Должность"}
            children={
              <div className={classes["main__upper__card"]}>
                <TriStateCheckbox label="Parent Checkbox">
                  <ChildCheckbox
                    label="Child Checkbox 1"
                    parentChecked={null}
                    onChildChange={() => {}}
                  />
                  <ChildCheckbox
                    label="Child Checkbox 2"
                    parentChecked={null}
                    onChildChange={() => {}}
                  />
                </TriStateCheckbox>
                <TriStateCheckbox label="Parent Checkbox">
                  <ChildCheckbox
                    label="Child Checkbox 1"
                    parentChecked={null}
                    onChildChange={() => {}}
                  />
                  <ChildCheckbox
                    label="Child Checkbox 2"
                    parentChecked={null}
                    onChildChange={() => {}}
                  />
                  <ChildCheckbox
                    label="Child Checkbox 1"
                    parentChecked={null}
                    onChildChange={() => {}}
                  />
                  <ChildCheckbox
                    label="Child Checkbox 2"
                    parentChecked={null}
                    onChildChange={() => {}}
                  />
                  <ChildCheckbox
                    label="Child Checkbox 1"
                    parentChecked={null}
                    onChildChange={() => {}}
                  />
                  <ChildCheckbox
                    label="Child Checkbox 2"
                    parentChecked={null}
                    onChildChange={() => {}}
                  />
                </TriStateCheckbox>
                <TriStateCheckbox label="Parent Checkbox">
                  <ChildCheckbox
                    label="Child Checkbox 1"
                    parentChecked={null}
                    onChildChange={() => {}}
                  />
                  <ChildCheckbox
                    label="Child Checkbox 2"
                    parentChecked={null}
                    onChildChange={() => {}}
                  />
                </TriStateCheckbox>
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
      <Divider />
      <div className={classes["main__lower"]}>
        <div className={classes["main__lower__container"]}>
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
              {data.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.contactInfo}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.dateOfBirth}</TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell>
                    <Button variant="contained">Подробнее</Button>
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
