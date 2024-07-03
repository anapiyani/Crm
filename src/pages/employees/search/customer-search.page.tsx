import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";

import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import classes from "./styles.module.scss";
import SearchFilterCard from "./components/search-filter-card";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import {
  ChildCheckbox,
  TriStateCheckbox,
} from "@/components/intermediate-checkbox/intermediate-checkbox";

const EmployeeSearch = () => {
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
      <div className={classes["main__lower"]}></div>
    </div>
  );
};

export default EmployeeSearch;
