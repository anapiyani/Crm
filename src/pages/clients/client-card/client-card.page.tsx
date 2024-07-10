import React from "react";
import { HomeOutlined } from "@mui/icons-material";
import TableVertical from "@/components/tables/tableVertical/employee-vertical-info-card";
import TableHorizontal from "@/components/tables/table-horizontal/employee-horizontal-info-card";
import Grid from "@mui/material/Unstable_Grid2";
import classes from "./styles.module.scss";
import InfoHeader from "@/components/navigation/header/info-header";

const clientTabsData = [{ to: "/clients", icon: HomeOutlined, label: "Обзор" }];

const clientNameData = {
  name: "Карта клиента - Марина Владимировна",
};

const ClientCard = () => {
  const mainTableData = [
    { property: "Автосегмент", value: "Не указано" },
    { property: "ID клиента", value: 7 },
    { property: "Категория", value: "Без категории" },
    { property: "Фамилия", value: "Едрес" },
    { property: "Имя", value: "Марина" },
    { property: "Отчество", value: "Владимировна" },
    { property: "Моб. телефон", value: "+ (777) 7777-76-66" },
    { property: "Рассылка SMS", value: "Запрет на рассылку" },
    { property: "Черный список", value: "Нет" },
    { property: "Онлайн запись", value: "Да" },
    { property: "Явка", value: "100% (0 из 48 не пришёл)" },
  ];

  const additionalInfoTableData = [
    { property: "1-е посещение", value: "08.05.2020" },
    { property: "Род занятий", value: "Не указано" },
    { property: "Дата рождения", value: "07.01.1990" },
    { property: "Возраст", value: "30 лет" },
    { property: "Пол", value: "Жен." },
    { property: "Анкета", value: "Есть" },
    { property: "Договор подписан", value: "Нет" },
    { property: "Привлечение", value: "Нет" },
    { property: "Откуда узнали", value: "Не указано" },
    { property: "Удобство расположения", value: "Не указано" },
    { property: "Город", value: "Не указано" },
    { property: "Дата добавления", value: "08.05.2020, 15:30" },
    { property: "Добавил сотрудник", value: "Наталья Ильченко" },
    { property: "Объединение", value: "Есть" },
    { property: "Салон клиента", value: "" },
  ];

  const discountsTableData = [
    { property: "Тип скидки", value: "Отсутствует" },
    { property: "Скидка", value: "Отсутствует" },
  ];

  const financeTableData = [
    { property: "Депозит", value: "0 История" },
    { property: "Бонусы", value: "0 История" },
    { property: "Деп. абонемент", value: "0 Подробности" },
  ];

  const contactsTableData = [
    { type: "Моб. телефон", contact: "+7 (777) 777-76-66", primary: true },
  ];

  const commentsTableData = [
    { property: "Комментарий", value: "Нет ни одного комментария" },
  ];

  const addressData = [{ property: "Адрес", value: "Нет данных." }];

  return (
    <div className={classes["main"]}>
      <InfoHeader tabsData={clientTabsData} nameData={clientNameData} />
      <Grid
        container
        sx={{
          mb: "5rem",
          ml: { xs: "2rem", xl: "7.6rem" },
          flexDirection: { xs: "column", md: "row" },
        }}
        columnGap={3}
        rowGap={{ xs: 3}}
        xs={9}
        md={12}
      >
        <Grid
          container
          lg={5}
          md={5}
          xl={3.2}
          sx={{ alignItems: "flex-start" }}
          rowGap={3}
        >
          <TableVertical data={mainTableData} title="Главное" />
          <TableVertical
            data={additionalInfoTableData}
            title="Доп. информация"
          />
        </Grid>

        <Grid
          container
          xl={3.2}
          rowGap={{ xs: 3 }}
          sx={{ flexDirection: "column" }}
        >
          <TableVertical data={discountsTableData} title="Скидки" />
          <TableVertical data={financeTableData} title="Финансы" />
          <TableHorizontal data={contactsTableData} title="Контакты" />
          <TableVertical data={commentsTableData} title="Комментарии" />
        </Grid>

        <Grid container xl={3.8} sx={{ flexDirection: "column" }} rowGap={3}>
          <TableVertical data={addressData} title="Адрес проживания" />
        </Grid>
      </Grid>
    </div>
  );
};

export default ClientCard;
