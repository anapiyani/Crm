import React from "react";
import {
  Paper,
  Box,
  TextField,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Add, Clear, SaveOutlined } from "@mui/icons-material";
import TableVertical from "@/components/tables/tableVertical/vertical-info-card";
import TableHorizontal from "@/components/tables/table-horizontal/horizontal-info-card";
import InfoHeader from "@/components/navigation/header/info-header";
import { employeeTabsData } from "./data";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  cardInfoEmplpyee,
  mainInfoEmployee,
} from "@/service/employee/employee.service";
import classes from "./styles.module.scss";

const EmployeeCard = () => {
  const params = useParams<{ id: string }>();
  const location = useLocation();

  const {
    data: counterCardData,
    isLoading: counterCardLoading,
    isError: counterCardError,
  } = useQuery({
    queryKey: ["cardInfoEmplpyee", params.id],
    queryFn: () => cardInfoEmplpyee(Number(params.id)),
  });

  const {
    data: userInfoData,
    isLoading: userInfoLoading,
    isError: userInfoError,
  } = useQuery({
    queryKey: ["mainInfoEmployee", params.id],
    queryFn: () => mainInfoEmployee(Number(params.id)),
  });

  const employeeNameData = {
    name: `Карта сотрудника - ${location.state.username}`,
  };

  const mainTableData = [
    { property: "ID сотрудника", value: userInfoData?.user_id },
    {
      property: "Статус",
      value: userInfoData?.is_active ? "Активен" : "Неактивен",
    },
    { property: "Должность", value: "Универсал, Парикмахерский зал" },
    { property: "Фамилия", value: userInfoData?.last_name },
    { property: "Имя", value: userInfoData?.first_name },
    {
      property: "Отобр. онлайн",
      value: userInfoData?.is_active ? "Да" : "Нет",
    },
    { property: "Моб. телефон", value: userInfoData?.phone_number },
    // { property: "Отчество", value: userInfoData?.middle_name }, // there is no middle name in the response
    // { property: "Push-уведомления", value: "Да" }, // there is no push notifications in the response
  ];

  const additionalTableData = [
    { property: "Работает с.", value: userInfoData?.start_date },
    { property: "Пол", value: userInfoData?.gender },
    { property: "Интервал", value: "По умолчанию" }, // there is no interval in the response
    { property: "Блокировать", value: "Да" }, // there is no block in the response
  ];

  const contactsData = [
    {
      type: "Моб. телефон",
      contact: userInfoData?.phone_number || "Нет данных",
      primary: true,
    },
  ];

  const addressData = [
    {
      property: "Адрес",
      value: userInfoData?.city
        ? `${userInfoData?.city}, ${userInfoData?.street}, ${userInfoData?.house}`
        : "Нет данных",
    },
  ];

  return counterCardLoading && userInfoLoading ? (
    <CircularProgress className={classes.loading} />
  ) : (
    <div className={classes["main"]}>
      <InfoHeader
        tabsData={employeeTabsData}
        nameData={employeeNameData}
        counterCardData={counterCardData!}
      />
      <Grid
        container
        spacing={3}
        sx={{
          mb: "5rem",
          ml: { xs: "2rem", xl: "7.6rem" },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Main Info Grid */}
        <Grid xs={10} md={6} lg={4}>
          <TableVertical data={mainTableData} title="Главное" showLockIcon />
        </Grid>

        {/* Additional Info Grid */}
        <Grid xs={10} md={6} lg={4}>
          <TableVertical data={additionalTableData} title="Доп. информация" />
        </Grid>

        {/* Contacts and Address Grid */}
        <Grid xs={10} md={6} lg={4}>
          <Grid xs={12} container spacing={2}>
            <Grid xs={12}>
              <TableHorizontal data={contactsData} title="Контакты" />
            </Grid>
            <Grid xs={12}>
              <TableVertical data={addressData} title="Адрес проживания" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeCard;
