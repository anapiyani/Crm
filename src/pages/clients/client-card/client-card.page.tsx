import React, { useState } from "react";
import TableVertical from "@/components/tables/tableVertical/vertical-info-card";
import TableHorizontal from "@/components/tables/table-horizontal/horizontal-info-card";
import VisitHistory from "./components/visit-history-table";
import Grid from "@mui/material/Unstable_Grid2";
import classes from "./styles.module.scss";
import InfoHeader from "@/components/navigation/header/info-header";
import {
  discountsTableData,
  financeTableData,
  contactsTableData,
  commentsTableData,
  sampleVisits,
} from "./data";
import { useParams } from "react-router-dom";
import {
  Add,
  CalendarMonthOutlined,
  ContentCut,
  CreditScoreOutlined,
  ExitToApp,
  HomeOutlined,
  PaymentsOutlined,
} from "@mui/icons-material";
import {
  cardInfoEmplpyee,
  getWalletHistory,
  mainInfoEmployee,
} from "@/service/employee/employee.service";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ClientVisitsTable from "./components/visit-table-tab/visitTable";
import { render } from "@fullcalendar/core/preact.js";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import { employeeTabsData } from "@/pages/employees/employee-card/data";
import { Box, Divider } from "@mui/material";
import CounterCard from "@/components/counter-card/counter-card";
import RevenueChart from "@/pages/employees/employee-card/components/chart";
import { getBalance } from "@/service/activity/activity.service";
import EventDetailsThirdTab from "@/modals/home/event-details/_tabs/event-details-third-tab";
import {
  getCustomerAppointmentHistoryById,
  getCustomerAppointmentNoShowById,
  getCustomerAppointmentPlannedById,
  getCustomerDeletedAppointments,
} from "@/service/appointments/appointments.service";

const ClientCard = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  const params = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const pageCount = 10;
  dayjs.extend(relativeTime);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const { data: userInfoData, isLoading: userInfoLoading } = useQuery({
    queryKey: ["mainInfoEmployee", params.id],
    queryFn: () => mainInfoEmployee(Number(params.id)),
  });

  const { data: counterCardData, isLoading: counterCardLoading } = useQuery({
    queryKey: ["cardInfoEmplpyee", params.id],
    queryFn: () => cardInfoEmplpyee(Number(params.id)),
  });

  const { data: financeData, isLoading: financeLoading } = useQuery({
    queryKey: ["getWalletHistory", params.id],
    queryFn: () => getBalance(params.id!),
  });

  const {
    data: customerAppointmentHistoryData,
    isPending: customerAppointmentPending,
    refetch: customerRefetch,
  } = useQuery({
    queryKey: ["customerAppointmentHistoryData", params.id],
    queryFn: () =>
      params.id
        ? getCustomerAppointmentHistoryById(Number(params.id))
        : undefined,
    enabled: !!params.id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: customerAppointmentNoShowData, refetch: noDataRefetch } =
    useQuery({
      queryKey: ["customerAppointmentNoShowData", params.id],
      queryFn: () =>
        params.id
          ? getCustomerAppointmentNoShowById(Number(params.id))
          : undefined,
      enabled: !!params.id,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    });

  const { data: customerAppointmentPlanned, refetch: plannedRefetch } =
    useQuery({
      queryKey: ["customerAppointmentPlanned", params.id],
      queryFn: () =>
        params.id
          ? getCustomerAppointmentPlannedById(Number(params.id))
          : undefined,
      enabled: !!params.id,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    });

  const { data: customerDeletedAppointments, refetch: deletedRefetch } =
    useQuery({
      queryKey: ["customerDeletedAppointments", params.id],
      queryFn: () =>
        params.id
          ? getCustomerDeletedAppointments(Number(params.id))
          : undefined,
      enabled: !!params.id,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    });

  const mainTableData = [
    { property: "Автосегмент", value: "Не указано" },
    { property: "ID клиента", value: userInfoData?.user_id },
    { property: "Категория", value: userInfoData?.category || "Без категории" },
    { property: "Фамилия", value: userInfoData?.last_name || "Не указано" },
    { property: "Имя", value: userInfoData?.first_name || "Не указано" },
    {
      property: "Моб. телефон",
      value: userInfoData?.phone_number || "Не указано",
    },
    {
      property: "Явка",
      value: `${userInfoData?.attendance}% (${userInfoData?.total_appointments} из ${userInfoData?.unattended_appointments} не пришёл)`,
    },
    {
      property: "Рассылка SMS",
      value: userInfoData?.sms_notification ? "Да" : "Запрет на рассылку",
    },
  ];

  const additionalInfoTableData = [
    {
      property: "1-е посещение",
      value: dayjs(userInfoData?.first_visit).format("DD.MM.YYYY"),
    },
    {
      property: "Род занятий",
      value: userInfoData?.occupation || "Не указано",
    },
    {
      property: "Дата рождения",
      value: userInfoData?.date_of_birth || "Не указано",
    },
    {
      property: "Возраст",
      value: userInfoData?.date_of_birth
        ? dayjs(userInfoData.date_of_birth).fromNow()
        : "Не указано",
    },
    {
      property: "Пол",
      value: userInfoData?.gender === "female" ? "Жен." : "Муж.",
    },
    { property: "Анкета", value: userInfoData?.anketa ? "Есть" : "Нет" },
    {
      property: "Договор подписан",
      value: userInfoData?.dogovor_podpisan ? "Да" : "Нет",
    },
    {
      property: "Привлечение",
      value: userInfoData?.privlechenie || "Не указано",
    },
    {
      property: "Откуда узнали",
      value: userInfoData?.invite_source || "Не указано",
    },
    { property: "Город", value: userInfoData?.city || "Не указано" },
    {
      property: "Дата добавления",
      value: userInfoData?.start_date || "Не указано",
    },
    { property: "Добавил сотрудник", value: "Наталья Ильченко" },
    { property: "Объединение", value: userInfoData?.connection ? "Да" : "Нет" },
  ];

  const financeTableData = [
    {
      property: "Депозит",
      value: financeData?.balance + " ₸" || "0",
      link: "/clients/deposits/history",
      linkLabel: "История",
    },
  ];

  const contactsTableData = [
    {
      type: "Моб. телефон",
      contact: userInfoData?.phone_number || "Не указано",
      primary: true,
    },
  ];

  const discountsTableData = [
    {
      property: "Тип скидки",
      value: userInfoData?.personal_discount?.type.name
        ? userInfoData?.personal_discount?.type.name
        : "Отсутствует",
    },
    {
      property: "Скидка",
      value: userInfoData?.personal_discount?.promotion_name
        ? userInfoData?.personal_discount.promotion_name
        : "Отсутствует",
    },
  ];

  const getWorkingTime = () => {
    const today = new Date();
    const start_date = userInfoData?.first_visit;

    if (start_date) {
      const startDate = new Date(start_date);
      const diff = today.getTime() - startDate.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      return days;
    }
  };

  const lastAppointmentData = () => {
    return (
      dayjs(
        customerAppointmentHistoryData?.[
          customerAppointmentHistoryData.length - 1
        ]?.date,
      ).format("DD.MM.YYYY") || "Не указано"
    );
  };

  const renderContentHeader = () => {
    switch (currentTab) {
      case 0:
        return (
          <Grid container xl={12} sx={{ gap: "0.8rem" }}>
            <div className={classes["main__header__upper__row__cards"]}>
              <CounterCard
                backgroundColor={"rgba(76, 175, 80, 0.3)"}
                icon={<CreditScoreOutlined />}
                iconColor="var(--success-main)"
                textTitle="Выручка"
                valueText={counterCardData?.revenue + " ₸" || "0"}
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
                textTitle="Является клиентом"
                valueText={getWorkingTime() + " дней"}
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
                icon={<Add />}
                iconColor="var(--success-main)"
                textTitle="Добавить новое посещение"
                valueText={""}
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
                textTitle="Дата последнего посещения"
                valueText={lastAppointmentData()?.toString() || "0"}
              />
            </div>
            <RevenueChart />
          </Grid>
        );
      case 2:
        return <div></div>;
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
            sx={{
              mb: "5rem",
              ml: { xs: "2rem", xl: "7.6rem" },
              flexDirection: { xs: "column", md: "row" },
            }}
            columnGap={3}
            rowGap={{ xs: 3 }}
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
              <TableVertical
                data={mainTableData}
                title="Главное"
                includeDropdown
              />
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
              <TableHorizontal
                data={commentsTableData}
                title="Комментарии"
                hasTableHead={false}
                showEyeIcon
              />
            </Grid>

            <Grid
              container
              xl={3.8}
              sx={{ flexDirection: "column" }}
              rowGap={3}
            >
              <VisitHistory
                visits={sampleVisits}
                title="История посещений"
                showEyeIcon={true}
                page={page}
                pageCount={pageCount}
                onPageChange={handlePageChange}
              />
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
            <div style={{ width: "100%" }}>
              <EventDetailsThirdTab
                finishedVisitsData={customerAppointmentHistoryData || []}
                plannedVisitsData={customerAppointmentPlanned || []}
                noShowData={customerAppointmentNoShowData || []}
                deletedData={customerDeletedAppointments || []}
                isClientCard={true}
              />
            </div>
          </Grid>
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div className={classes["main"]}>
      {/* <InfoHeader
        tabsData={clientTabsData}
        nameData={clientNameData}
        counterCardData={counterCardData}
        onTabChange={handleTabChange}
      /> */}
      <div className={classes["main__header"]}>
        <Box sx={{ ml: { xs: "2rem", xl: "7.6rem" } }}>
          <div className={classes["main__header__upper"]}>
            <div>
              <BreadcrumbsCustom />
              <h1 className={classes["main__header__upper__title"]}>
                {userInfoData?.first_name} {userInfoData?.last_name}
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

export default ClientCard;
