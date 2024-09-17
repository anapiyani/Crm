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
  CachedOutlined,
  CalendarMonthOutlined,
  ContentCut,
  CreditScoreOutlined,
  ExitToApp,
  HomeOutlined,
  PaymentsOutlined,
  ReceiptLongOutlined,
  StarBorderOutlined,
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
import { clientsTabsData } from "./data";
import { Box, Button, Divider } from "@mui/material";
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
import {
  financeChartData,
  financeChartLabels,
  financeChartLegendLabels,
  revenueChartData,
  revenueChartLabels,
  revenueChartLegendLabels,
  discountChartData,
  discountChartLabels,
  discountChartLegendLabels,
} from "./data";
import EventPlannedTable from "@/modals/home/_components/event-planned-table/event-planned-table";
import DepositModal from "@/modals/clients/deposit.modal";
import PersonalDiscount from "./components/personal-discount/personalDiscountCard";

const ClientCard = () => {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleOpen = (update: boolean) => {
    setIsUpdate(update);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
    value: number
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

  const moneyMovementTableHeadCells = [
    { id: "operation" as const, numeric: false, label: "Операция" },
    { id: "sum" as const, numeric: true, label: "Сумма" },
    { id: "paid" as const, numeric: true, label: "Оплачено" },
    { id: "deposit" as const, numeric: true, label: "На депозите" },
    { id: "date" as const, numeric: false, label: "Дата" },
    { id: "employee" as const, numeric: false, label: "Сотрудник" },
    { id: "relation" as const, numeric: false, label: "Связь" },
    { id: "comment" as const, numeric: false, label: "Комментарий" },
  ];

  const moneyMovementTableBodyData = [
    {
      operation: "Пополнить депозит",
      sum: "25 000 тенге",
      paid: "25 000 тенге",
      deposit: "25 000 тенге",
      date: "4 июн 2020, 16:41",
      employee: "Имя Фамилия",
      relation: "Посещение №21746, Салон",
      comment: "Комментарий",
    },
    {
      operation: "Пополнить депозит",
      sum: "25 000 тенге",
      paid: "25 000 тенге",
      deposit: "25 000 тенге",
      date: "4 июн 2020, 16:41",
      employee: "Имя Фамилия",
      relation: "Посещение №21746, Салон",
      comment: "Комментарий",
    },
  ];

  const financeTableHeadCells = [
    { id: "number" as const, numeric: true, label: "№" },
    { id: "deposit" as const, numeric: true, label: "На депозите" },
    { id: "sumChange" as const, numeric: true, label: "Сумма изменения" },
    { id: "operation" as const, numeric: false, label: "Операция" },
    { id: "date" as const, numeric: false, label: "Дата" },
    { id: "employee" as const, numeric: false, label: "Сотрудник" },
    { id: "relation" as const, numeric: false, label: "Связь" },
    { id: "comment" as const, numeric: false, label: "Комментарий" },
  ];

  const financeTableBodyData = [
    {
      number: 1,
      deposit: "25 000 тенге",
      sumChange: "25 000 тенге",
      operation: "Пополнить депозит",
      date: "4 июн 2020, 16:41",
      employee: "Имя Фамилия, Врач-массажист",
      relation: "Счет, Салон",
      comment: "Комментарий",
    },
    {
      number: 2,
      deposit: "25 000 тенге",
      sumChange: "25 000 тенге",
      operation: "Пополнить депозит",
      date: "4 июн 2020, 16:41",
      employee: "Имя Фамилия, Врач-массажист",
      relation: "Счет, Салон",
      comment: "Комментарий",
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
        ]?.date
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
            <RevenueChart
              labels={revenueChartLabels}
              datasets={revenueChartData}
              maxY1={75}
              maxY2={60}
              legendLabels={revenueChartLegendLabels}
            />
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
            <RevenueChart
              labels={revenueChartLabels}
              datasets={revenueChartData}
              maxY1={75}
              maxY2={60}
              legendLabels={revenueChartLegendLabels}
            />
          </Grid>
        );
      case 2:
        return (
          <Grid container xl={12} sx={{ gap: "0.8rem" }}>
            <div className={classes["main__header__upper__row__cards"]}>
              <CounterCard
                backgroundColor={"#C7DFF7"}
                icon={<PaymentsOutlined />}
                iconColor="#0B6BCB"
                textTitle="Текущий депозит"
                valueText={"0 тенге"}
              />
              <CounterCard
                backgroundColor={"#FFCCBC"}
                icon={<ReceiptLongOutlined />}
                iconColor="#FF5722"
                textTitle="Сумма последнего чека"
                valueText={"1000 тенге"}
              />

              <CounterCard
                backgroundColor={"rgba(156,39,176, 0.3)"}
                icon={<CalendarMonthOutlined />}
                iconColor="var(--secondary-main)"
                textTitle="Дата последней операции"
                valueText={lastAppointmentData()?.toString() || "0"}
              />
            </div>
            <RevenueChart
              labels={financeChartLabels}
              datasets={financeChartData}
              maxY1={75}
              maxY2={60}
              legendLabels={financeChartLegendLabels}
            />
          </Grid>
        );
      case 3:
        return (
          <Grid container xl={12} sx={{ gap: "0.8rem" }}>
            <div className={classes["main__header__upper__row__cards"]}>
              <CounterCard
                backgroundColor={"#2E7D324D"}
                icon={<Add />}
                iconColor="#2E7D32"
                textTitle="Выдать скидку или карту"
                valueText={""}
              />
              <CounterCard
                backgroundColor={"#F7C5C5"}
                icon={<StarBorderOutlined />}
                iconColor="#C41C1C"
                textTitle="Количество скидок"
                valueText={"4 шт."}
              />

              <CounterCard
                backgroundColor={"#2196F34D"}
                icon={<PaymentsOutlined />}
                iconColor="#2196F3"
                textTitle="Текущая скидка"
                valueText={"10%"}
              />
            </div>
            <RevenueChart
              labels={discountChartLabels}
              datasets={discountChartData}
              maxY1={15}
              maxY2={6}
              legendLabels={discountChartLegendLabels}
              showThousandSuffix={false}
            />
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
              }}
            >
              <div>
                <div style={{ padding: "1.6rem 0rem" }}>
                  <p style={{ fontSize: "2.4rem", marginBottom: "1rem" }}>
                    Движение денежных средств
                  </p>
                  <Divider />
                </div>

                <EventPlannedTable
                  data={moneyMovementTableBodyData}
                  headCells={moneyMovementTableHeadCells}
                />
              </div>
              <div>
                <div style={{ padding: "1.6rem 0rem" }}>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "1rem",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ fontSize: "2.4rem" }}>Депозит</p>

                    <div
                      style={{
                        display: "flex",
                        gap: "2rem",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="text"
                        color="primary"
                        startIcon={<Add />}
                        className="add-button"
                        sx={{
                          textTransform: "none",
                          padding: 0,
                          fontSize: "1.4rem",
                          fontWeight: 600,
                        }}
                        onClick={() => handleOpen(false)}
                      >
                        Пополнить депозит
                      </Button>
                      <Button
                        variant="text"
                        color="primary"
                        startIcon={<CachedOutlined />}
                        className="add-button"
                        sx={{
                          textTransform: "none",
                          padding: 0,
                          fontSize: "1.4rem",
                          fontWeight: 600,
                        }}
                        onClick={() => handleOpen(true)}
                      >
                        Обновить депозит
                      </Button>
                    </div>
                  </div>
                  <DepositModal
                    open={open}
                    onClose={handleClose}
                    isUpdate={isUpdate}
                  />
                  <Divider />
                </div>

                <EventPlannedTable
                  data={financeTableBodyData}
                  headCells={financeTableHeadCells}
                />
              </div>
            </div>
          </Grid>
        );
      case 3:
        return (
          <Grid
            container
            sx={{ mb: "5rem", ml: { xs: "2rem", xl: "7.6rem" } }}
            xs={9}
            md={10.5}
            gap={3}
          >
            <PersonalDiscount
              status="Активна"
              visits={5}
              totalAmount="50 000 тенге"
              savedAmount="5 000 тенге"
              issueDate="4 июн 2020" 
              percent={10}
            />
            <PersonalDiscount
              status="Неактивна"
              visits={5}
              totalAmount="50 000 тенге"
              savedAmount="5 000 тенге"
              issueDate="4 июн 2020" 
              percent={10}
            />
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
              tabsData={clientsTabsData}
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
