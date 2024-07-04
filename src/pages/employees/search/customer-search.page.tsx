import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";

import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Table,
  TableCell,
  TableHead,
} from "@mui/material";
import classes from "./styles.module.scss";
import SearchFilterCard from "./components/search-filter-card";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import {
  ChildCheckbox,
  TriStateCheckbox,
} from "@/components/intermediate-checkbox/intermediate-checkbox";
import Datatable from "@/components/datatable/datatable";

const EmployeeSearch = () => {
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
        <Datatable
          header={
            <div className={classes["main__lower__header"]}>
              <h2>Результаты поиска</h2>
            </div>
          }
          columns={
            <>
              <tr>
                <th
                  style={{
                    width: "3%",
                  }}
                >
                  N
                </th>
                <th>Calories</th>
                <th>Fat&nbsp;(g)</th>
                <th>Carbs&nbsp;(g)</th>
                <th>Protein&nbsp;(g)</th>
              </tr>
            </>
          }
          children={
            <tbody>
              <tr>
                <td>1</td>
                <td>159</td>
                <td>6</td>
                <td>24</td>
                <td></td>
              </tr>
              <tr>
                <td>3</td>
                <td>262</td>
                <td style={{ padding: "0px" }}>
                  <table>
                    <tbody>
                      <tr>
                        <td>Name: John Doe</td>
                      </tr>
                      <tr>
                        <td>Occupation: Developer</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>24</td>
                <td>6</td>
              </tr>
              <tr>
                <td>4</td>
                <td>305</td>
                <td>3.7</td>
                <td>67</td>
                <td>4.3</td>
              </tr>
              <tr>
                <td>5</td>
                <td>356</td>
                <td>16</td>
                <td>49</td>
                <td>3.9</td>
              </tr>
            </tbody>
          }
        />
      </div>
    </div>
  );
};

export default EmployeeSearch;
