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

const ClientSearch = () => {
  const { register, handleSubmit, reset } = useForm<ISearchFormData>();

  const onSubmitSearch: SubmitHandler<ISearchFormData> = (data) => {
    console.log(data);
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
              children={
                <div className={classes["main__upper__card"]}>
                  <VerticalTextField
                    label="ID"
                    name="clientID"
                    placeholder="Введите ID клиента"
                  />

                  <VerticalTextField
                    label="Email"
                    name="email"
                    placeholder="Введите email"
                  />

                  <VerticalTextField
                    label="1-e посещение"
                    placeholder="С"
                    placeholderOptional="По"
                    type="double"
                  />

                  <VerticalTextField
                    label="Дата рождения"
                    placeholder="С"
                    placeholderOptional="По"
                    type="double"
                  />

                  <VerticalTextField
                    label="Возраст"
                    placeholder="С"
                    placeholderOptional="По"
                    type="double"
                  />
                  <div className={classes["main__upper__checkboxes"]}>
                    <p>Пол</p>
                    <FormGroup sx={{ flexDirection: "row" }}>
                      <FormControlLabel control={<Checkbox />} label="Муж" />
                      <FormControlLabel control={<Checkbox />} label="Жен" />
                    </FormGroup>
                  </div>
                  <VerticalTextField
                    label="Кл. сотрудн."
                    placeholder="Выберите сотрудника"
                  />
                </div>
              }
            ></SearchFilterCard>
          </div>
          <div className={classes["main__upper__position"]}>
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
              Показано 10 из 10 записей
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
              page={10}
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
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Иванов Иван Иванович</TableCell>
                <TableCell>123456789</TableCell>
                <TableCell>8-800-555-35-35</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell>25</TableCell>
                <TableCell>01.01.1996</TableCell>
                <TableCell>Male</TableCell>
                <TableCell>Не указано</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ClientSearch;
