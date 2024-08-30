import React, { useState } from "react";
import classes from "./styles.module.scss";
import CounterCard from "@/components/counter-card/counter-card";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import {
  ContentCut,
  ExitToApp,
  CalendarMonthOutlined,
  ShoppingCartOutlined,
  Edit,
  GroupsOutlined,
  PersonOutlined,
  PollOutlined,
  PushPinOutlined,
} from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import RevenueChart from "./employee-card/components/chart";
import { employeeTabsData } from "@/pages/employees/employee-card/data";
import TableHorizontal from "@/components/tables/table-horizontal/horizontal-info-card";
import TableVertical from "@/components/tables/tableVertical/vertical-info-card";
import {
  cardInfoEmplpyee,
  mainInfoEmployee,
} from "@/service/employee/employee.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { data } from "./employee-visits/data";
import EmployeeVisitsTable from "./employee-visits/visits-table/employee-visits-table";
import { salaryData } from "./employee-salaryAndFines/_components/bonusesTable/data";
import SalaryTable from "./employee-salaryAndFines/_components/bonusesTable/tableBonuses";
import { current } from "@reduxjs/toolkit";

const EmployeePage = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  const params = useParams<{ id: string }>();
  // THIS IS FOR USER DATA
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

  const renderContentHeader = () => {
    switch (currentTab) {
      case 0:
        return (
          <Grid container xl={12} sx={{ gap: "0.8rem" }}>
            <div className={classes["main__header__upper__row__cards"]}>
              <CounterCard
                backgroundColor={"rgba(76, 175, 80, 0.3)"}
                icon={<ContentCut />}
                iconColor="var(--success-main)"
                textTitle="Выручка за все время"
                valueText={
                  counterCardData?.revenue ? counterCardData.revenue : "0"
                }
              />
              <CounterCard
                backgroundColor={"rgba(33, 150, 243, 0.3)"}
                icon={<ExitToApp />}
                iconColor="var(--primary-main)"
                textTitle="Обслуженные посещения"
                valueText={
                  counterCardData?.services_count
                    ? counterCardData?.services_count.toString()
                    : "0"
                }
              />

              <CounterCard
                backgroundColor={"rgba(156,39,176, 0.3)"}
                icon={<CalendarMonthOutlined />}
                iconColor="var(--secondary-main)"
                textTitle="Является сотрудником"
                valueText="8 месяцев 3 дня"
              />
            </div>
            <RevenueChart />
          </Grid>
        );
      case 1:
        return (
          <Grid container xl={12} sx={{ gap: "0.8rem" }}>
            <div className={classes["main__header__upper__row__cards"]}>
              <CounterCard
                backgroundColor={"rgba(76, 175, 80, 0.3)"}
                icon={<ContentCut />}
                iconColor="var(--success-main)"
                textTitle="Услуг оказано"
                valueText={"241"}
              />
              <CounterCard
                backgroundColor={"rgba(33, 150, 243, 0.3)"}
                icon={<ExitToApp />}
                iconColor="var(--primary-main)"
                textTitle="Посещения"
                valueText={
                  counterCardData?.services_count
                    ? counterCardData?.services_count.toString()
                    : "0"
                }
              />

              <CounterCard
                backgroundColor={"rgba(156,39,176, 0.3)"}
                icon={<CalendarMonthOutlined />}
                iconColor="var(--secondary-main)"
                textTitle="Последнее посещение"
                valueText="09.03.2023"
              />
            </div>
            <RevenueChart />
          </Grid>
        );
      case 2:
        return (
          <Grid container xl={12} sx={{ gap: "0.8rem" }}>
            <div className={classes["main__header__upper__row__button"]}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  fontSize: "1.4rem",
                  height: "4rem",
                  textTransform: "none",
                }}
                startIcon={<Edit />}
              >
                Настроить зарплату
              </Button>
            </div>
            <div className={classes["main__header__upper__row__cards"]}>
              <CounterCard
                backgroundColor="#ECEFF1"
                icon={<PushPinOutlined />}
                iconColor="#607D8B"
                textTitle="Фикс. часть"
                valueText="За смену"
                textTitleFocus="0 руб."
              />
              <CounterCard
                backgroundColor="rgba(33, 150, 243, 0.3)"
                icon={<PollOutlined />}
                iconColor="var(--primary-main)"
                textTitle="Плав. часть"
                valueText="От выручки"
                textTitleFocus="0%"
              />

              <CounterCard
                backgroundColor="rgba(76, 175, 80, 0.3)"
                icon={<ShoppingCartOutlined />}
                iconColor="var(--success-main)"
                textTitle="Прод. товаров"
                valueText="От продаж"
                textTitleFocus="0%"
              />
              <CounterCard
                backgroundColor="rgba(33, 150, 243, 0.3)"
                icon={<GroupsOutlined />}
                iconColor="var(--primary-main)"
                textTitle="Привл. клиентов"
                valueText="За клиента"
                textTitleFocus="0 руб."
              />
              <CounterCard
                backgroundColor="rgba(156, 39, 176, 0.3)"
                icon={<PersonOutlined />}
                iconColor="var(--secondary-main)"
                textTitle="Развитие клиентов"
                valueText="От продаж"
                textTitleFocus="0 руб."
              />
            </div>
          </Grid>
        );
      default:
        return <div></div>;
    }
  };

  const renderContentMain = () => {
    switch (currentTab) {
      case 0:
        return (
          <Grid
            container
            spacing={3}
            sx={{
              mb: "5rem",
              ml: { xs: "2rem", xl: "7.6rem" },
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Grid xs={10} md={6} lg={4}>
              <TableVertical
                data={mainTableData}
                title="Главное"
                showLockIcon
              />
            </Grid>

            <Grid xs={10} md={6} lg={4}>
              <TableVertical
                data={additionalTableData}
                title="Доп. информация"
              />
            </Grid>

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
        );
      case 1:
        return (
          <Grid
            container
            sx={{
              mb: "5rem",
              ml: { xs: "2rem", xl: "7.6rem" },
            }}
            xs={9}
            md={10.5}
          >
            <EmployeeVisitsTable data={data} />
          </Grid>
        );
      case 2:
        return (
          <Grid
            container
            sx={{
              mb: "5rem",
              ml: { xs: "2rem", xl: "7.6rem" },
            }}
            xs={9}
            md={10.5}
          >
            <SalaryTable data={salaryData} />
          </Grid>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div className={classes["main"]}>
      <div className={classes["main__header"]}>
        <Box sx={{ ml: { xs: "2rem", xl: "7.6rem" } }}>
          <div className={classes["main__header__upper"]}>
            <div>
              <BreadcrumbsCustom />
              <h1 className={classes["main__header__upper__title"]}>
                Yesset Yedres
              </h1>
            </div>
            <ResponsiveTabs
              tabsData={employeeTabsData}
              onTabChange={handleTabChange}
              currentTab={currentTab}
            />
            <div className={classes["main__header__upper__row"]}>
              {renderContentHeader()}
            </div>
          </div>
        </Box>
      </div>
      {renderContentMain()}
    </div>
  );
};

export default EmployeePage;
