import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import classes from "./styles.module.scss";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import SearchFilterCard from "@/pages/employees/search/components/search-filter-card";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";

const ClientSearch = () => {
  return (
    <div className={classes["main"]}>
      <div className={classes["main__wrapper"]}>
        <BreadcrumbsCustom />
        <h1 className={classes["main__title"]}>Расширенный поиск клиентов</h1>
      </div>
      <div className={classes["main__upper"]}>
        <div className={classes["main__upper__main"]}>
          <SearchFilterCard
            title={"Основные данные"}
            children={
              <div className={classes["main__upper__card"]}>
                <VerticalTextField
                  label="Карта"
                  name="cardnumber"
                  placeholder="Введите номер карты"
                />

                <VerticalTextField
                  label="ФИО"
                  name="search"
                  placeholder="Введите имя"
                />

                <VerticalTextField
                  label="Телефон"
                  name="phoneNumber"
                  placeholder="Введите номер"
                />

                <VerticalTextField
                  label="WhatsApp"
                  name="whatsappNumber"
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
        <Button variant="contained">Искать</Button>
      </div>
    </div>
  );
};

export default ClientSearch;
