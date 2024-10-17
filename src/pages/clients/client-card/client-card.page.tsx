import React, { useState } from "react";
import TableVertical from "@/components/tables/tableVertical/vertical-info-card";
import TableHorizontal from "@/components/tables/table-horizontal/horizontal-info-card";
import VisitHistory from "./components/visit-history-table";
import Grid from "@mui/material/Unstable_Grid2";
import classes from "./styles.module.scss";
import { commentsTableData, sampleVisits } from "./data";
import { Link, useParams } from "react-router-dom";
import {
  Add,
  CachedOutlined,
  CalendarMonthOutlined,
  CardGiftcardOutlined,
  CreditCard,
  CreditScoreOutlined,
  ExitToApp,
  LocalActivity,
  LocalActivityOutlined,
  MenuBook,
  Payments,
  PaymentsOutlined,
  PlayCircleFilledOutlined,
  ReceiptLongOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import {
  cardInfoEmplpyee,
  mainInfoEmployee,
} from "@/service/employee/employee.service";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import { clientsTabsData } from "./data";
import {
  Box,
  Button,
  Divider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
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
  membershipChartData,
  membershipChartLabels,
  membershipChartLegendLabels,
} from "./data";
import EventPlannedTable from "@/modals/home/_components/event-planned-table/event-planned-table";
import PersonalDiscount from "./components/personal-discount/personalDiscountCard";
import { r } from "node_modules/@fullcalendar/resource/internal-common";
import MembershipTable from "./components/membership-table/membershipTable";
import CommentList from "./components/comments-list/commentsList";
import { searchKassaData } from "@/service/kassa/kassa.service";
import { getDepositHistory } from "@/service/client/client.service";
import NiceModal from "@ebay/nice-modal-react";
import clientDepositTopupModal from "@/modals/clients/client-deposit-topup.modal";
import clientDepositUpdateModal from "@/modals/clients/client-deposit-update.modal";
import clientCommentAddModal from "@/modals/clients/client-comment-add.modal";
import { CreateAppointmentModal } from "@/modals";

interface IOption {
  label: string;
  value: number;
}
import { IAppointmentHistory } from "@/ts/appointments.interface";

type EditType =
  | "text"
  | "select"
  | "number"
  | "boolean"
  | "nonEditable"
  | "city"
  | "date";

type DataRow = {
  property?: string;
  value?: string | number | boolean;
  link?: string;
  linkLabel?: string;
  editType?: EditType | "nonEditable";
  autocomplete?: string[];
  scnd_value?: string;
  primary?: boolean;
};

const ClientCard = () => {
  const [pageSizeTransaction, setPageSizeTransaction] = useState<IOption>({
    label: "10",
    value: 10,
  });
  const [pageTransaction, setPageTransaction] = useState(1);

  const pageSizeOptionsTransaction: IOption[] = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

  const handlePageTransactionSizeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedOption = pageSizeOptionsTransaction.find(
      (option) => option.value === Number(event.target.value)
    ) || { label: "10", value: 10 };
    setPageSizeTransaction(selectedOption);
  };

  const handlePageTransactionChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageTransaction(value);
  };

  const [currentTab, setCurrentTab] = useState<number>(0);
  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  const params = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const pageCount = 10;
  dayjs.extend(relativeTime);

  const [pageSizeDeposit, setPageSizeDeposit] = useState<IOption>({
    label: "10",
    value: 10,
  });
  const [pageDeposit, setPageDeposit] = useState(1);
  const pageDepositCount = 10;

  const pageSizeOptionsDeposit: IOption[] = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

  const handlePageDepositSizeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedOption = pageSizeOptionsDeposit.find(
      (option) => option.value === Number(event.target.value)
    ) || { label: "10", value: 10 };
    setPageSizeDeposit(selectedOption);
  };

  const handlePageDepositChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageDeposit(value);
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

  const [pageSize, setPageSize] = useState(5);

  const transformAppointmentHistory = (appointments: IAppointmentHistory[]) => {
    return appointments.map((appointment) => ({
      description: appointment.services
        .map((service) => service.service_name)
        .join(", "),
      cost:
        appointment.services.reduce(
          (total, service) => total + parseFloat(service.total_price),
          0
        ) + " ₸",
      dateTime: `${appointment.date}, ${appointment.start_time}`,
      link: "",
    }));
  };

  const visitHistoryData = transformAppointmentHistory(
    customerAppointmentHistoryData || []
  );

  const totalPages = Math.ceil(visitHistoryData.length / pageSize);
  const paginatedData = visitHistoryData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const {
    data: customerAppointmentNoShowData,
    refetch: noDataRefetch,
  } = useQuery({
    queryKey: ["customerAppointmentNoShowData", params.id],
    queryFn: () =>
      params.id
        ? getCustomerAppointmentNoShowById(Number(params.id))
        : undefined,
    enabled: !!params.id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const {
    data: customerAppointmentPlanned,
    refetch: plannedRefetch,
  } = useQuery({
    queryKey: ["customerAppointmentPlanned", params.id],
    queryFn: () =>
      params.id
        ? getCustomerAppointmentPlannedById(Number(params.id))
        : undefined,
    enabled: !!params.id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const {
    data: customerDeletedAppointments,
    refetch: deletedRefetch,
  } = useQuery({
    queryKey: ["customerDeletedAppointments", params.id],
    queryFn: () =>
      params.id ? getCustomerDeletedAppointments(Number(params.id)) : undefined,
    enabled: !!params.id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const {
    data: clientTransactions,
    isLoading: clientTransactionsLoading,
  } = useQuery({
    queryKey: [
      "clientTransactions",
      params.id,
      pageSizeTransaction.value,
      pageTransaction,
    ],
    queryFn: () =>
      searchKassaData({
        customer: Number(params.id),
        page: pageTransaction,
        page_size: pageSizeTransaction.value,
      }),
  });

  const {
    data: clientDepositHistory,
    isLoading: clientDepositHistoryLoading,
  } = useQuery({
    queryKey: [
      "getDepositHistory",
      {
        user_id: Number(params.id),
        page: pageDeposit,
        page_size: pageSizeDeposit,
      },
    ],
    queryFn: () =>
      getDepositHistory({
        user_id: Number(params.id),
        page: pageDeposit,
        page_size: pageDepositCount,
      }),
  });

  const mainTableData: DataRow[] = [
    { property: "ID клиента", value: userInfoData?.user_id },
    {
      property: "Категория",
      value: userInfoData?.category || "Без категории",
      editType: "text",
    },
    {
      property: "Фамилия",
      value: userInfoData?.last_name || "Не указано",
      editType: "text",
    },
    {
      property: "Имя",
      value: userInfoData?.first_name || "Не указано",
      editType: "text",
    },
    {
      property: "Категория",
      value: userInfoData?.category || "Без категории",
      editType: "text",
    },
    {
      property: "Моб. телефон",
      value: userInfoData?.phone_number || "Не указано",
      editType: "text",
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

  const additionalInfoTableData: DataRow[] = [
    {
      property: "1-е посещение",
      value: dayjs(userInfoData?.first_visit).format("DD.MM.YYYY"),
      editType: "date",
    },
    {
      property: "Род занятий",
      value: userInfoData?.occupation || "Не указано",
      editType: "select",
      autocomplete: [
        "Безработный/домохозяйка",
        "Бизнесмен",
        "Госслужащий",
        "Инженер",
        "Офисный сотрудник",
        "Пенсионер",
        "Рабочий",
        "Студент",
        "Не указано",
      ],
    },
    {
      property: "Дата рождения",
      value: userInfoData?.date_of_birth
        ? dayjs(userInfoData.date_of_birth).format("DD/MM/YYYY")
        : "Не указано",
      editType: "date",
    },
    {
      property: "Возраст",
      value: userInfoData?.date_of_birth
        ? dayjs(userInfoData.date_of_birth).fromNow().split(" ")[0]
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
      editType: "boolean",
      autocomplete: ["Да", "Нет"],
    },
    {
      property: "Привлечение",
      value: userInfoData?.privlechenie || "Не указано",
    },
    {
      property: "Откуда узнали",
      value: userInfoData?.invite_source || "Не указано",
    },
    {
      property: "Город",
      value: userInfoData?.city || "Не указано",
      editType: "city",
    },

    {
      property: "Дата добавления",
      value: userInfoData?.start_date || "Не указано",
      editType: "date",
    },
    { property: "Добавил сотрудник", value: "Наталья Ильченко" },
    {
      property: "Объединение",
      value: userInfoData?.connection ? "Да" : "Нет",
      editType: "boolean",
      autocomplete: ["Да", "Нет"],
    },
  ];

  const financeTableData = [
    {
      property: "Депозит",
      value: financeData?.balance + " ₸" || "0",
      link: "/clients/deposits/history",
      linkLabel: "История",
    },
  ];

  const contactsTableData: DataRow[] = [
    {
      property: "Моб. телефон",
      value: userInfoData?.phone_number || "Не указано",
      primary: true,
      editType: "text",
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
                valueText={getWorkingTime() ? getWorkingTime() : 0 + " дней"}
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
                isClickable={true}
                cardClicked={() => {
                  NiceModal.show(CreateAppointmentModal, {
                    start: dayjs(Date.now()).format("YYYY-MM-DD, HH:mm"),
                    end: dayjs(Date.now())
                      .add(1, "hour")
                      .format("YYYY-MM-DD, HH:mm"),
                    hasClient: true,
                    clientId: Number(params.id),
                    clientName: `${userInfoData?.first_name} ${userInfoData?.last_name}`,
                  });
                }}
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
                valueText={financeData?.balance + " тенге" || "0"}
              />
              <CounterCard
                backgroundColor={"#FFCCBC"}
                icon={<ReceiptLongOutlined />}
                iconColor="#FF5722"
                textTitle="Сумма последнего чека"
                valueText={
                  financeData?.last_check_price
                    ? financeData.last_check_price
                    : 0 + " тенге" || "0"
                }
              />

              <CounterCard
                backgroundColor={"rgba(156,39,176, 0.3)"}
                icon={<CalendarMonthOutlined />}
                iconColor="var(--secondary-main)"
                textTitle="Дата последней операции"
                valueText={
                  dayjs(financeData?.last_operation_date).format(
                    "DD.MM.YYYY"
                  ) || "0"
                }
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
                valueText={"10"}
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
      case 4:
        return (
          <Grid container xl={12} sx={{ gap: "0.8rem" }}>
            <div className={classes["main__header__upper__row__cards"]}>
              <CounterCard
                backgroundColor={"#2196F34D"}
                iconColor="#2196F3"
                icon={<CardGiftcardOutlined />}
                textTitle="Сертификаты"
                valueText={"0 шт."}
              />
              <CounterCard
                backgroundColor={"#2E7D324D"}
                icon={<LocalActivityOutlined />}
                iconColor="#2E7D32"
                textTitle="Абонементы"
                valueText={"0 шт."}
              />
              <CounterCard
                backgroundColor={"#9C27B04D"}
                iconColor="#9C27B0"
                icon={<PlayCircleFilledOutlined />}
                textTitle="Активные сертификаты"
                valueText={"0 шт."}
              />
            </div>
            <RevenueChart
              labels={membershipChartLabels}
              datasets={membershipChartData}
              maxY1={75}
              maxY2={60}
              legendLabels={membershipChartLegendLabels}
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
                visits={paginatedData}
                title="История посещений"
                showEyeIcon={true}
                page={page}
                pageCount={totalPages}
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
          clientTransactions && (
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
                  <div className={classes["transactions_table"]}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>№</TableCell>
                          <TableCell>Операция</TableCell>
                          <TableCell>Сумма</TableCell>
                          <TableCell>Оплачено</TableCell>
                          <TableCell>На депозите</TableCell>
                          <TableCell>Дата</TableCell>
                          <TableCell>Сотрудник</TableCell>
                          <TableCell>Связь</TableCell>
                          <TableCell>Комментарий</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {clientTransactions?.results.map((result, index) => (
                          <TableRow key={result.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <p>
                                {result.operation_name} <br />{" "}
                                {dayjs(result.operation_date).format(
                                  "DD.MM.YYYY"
                                )}
                              </p>
                            </TableCell>
                            <TableCell>
                              <p
                                className={
                                  result.type === "income"
                                    ? classes.income
                                    : classes.expense
                                }
                              >
                                {result.amount} ₸
                              </p>
                            </TableCell>
                            <TableCell>
                              {result.overall_change_in_cash_register?.card !==
                                "0.00" || null ? (
                                <p
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                  }}
                                >
                                  {result.overall_change_in_cash_register.card
                                    ? result.overall_change_in_cash_register
                                        .card
                                    : null}{" "}
                                  ₸
                                  <CreditCard />
                                </p>
                              ) : null}
                              {result.overall_change_in_cash_register?.cash !==
                                "0.00" && (
                                <p
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                  }}
                                >
                                  {result.overall_change_in_cash_register.cash}{" "}
                                  ₸ <Payments />
                                </p>
                              )}
                              {result.overall_change_in_cash_register?.check !==
                                "0.00" && (
                                <p
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                  }}
                                >
                                  {result.overall_change_in_cash_register.check}{" "}
                                  ₸ <LocalActivity />
                                </p>
                              )}
                              {result.overall_change_in_cash_register
                                ?.checking_account !== "0.00" && (
                                <p
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                  }}
                                >
                                  {
                                    result.overall_change_in_cash_register
                                      .checking_account
                                  }
                                  ₸ <MenuBook />
                                </p>
                              )}
                            </TableCell>
                            <TableCell>{result.deposit} </TableCell>
                            <TableCell>
                              {dayjs(result.operation_date).format(
                                "DD.MM.YYYY"
                              )}
                            </TableCell>
                            <TableCell>
                              {result.employee ? (
                                <Link
                                  to={"/employees/" + result.employee}
                                  className={classes.name_link}
                                >
                                  {result.employee_name}
                                </Link>
                              ) : (
                                <p>Нет данных</p>
                              )}
                            </TableCell>
                            <TableCell>
                              <Link
                                className={classes.name_link}
                                to={`/visits/${result.appointment}`}
                              >
                                Посещение №{result.appointment}
                              </Link>
                            </TableCell>

                            <TableCell>{result.comment}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className={classes["transactions_table__container"]}>
                      <div
                        className={
                          classes["transactions_table__container__row"]
                        }
                      >
                        <p
                          className={
                            classes["transactions_table__container__label"]
                          }
                        >
                          Показано {clientTransactions?.results.length} из{" "}
                          {clientTransactions?.count} записей
                        </p>
                        <div>
                          <div className={classes["tableSettings"]}>
                            Показывать
                            <select
                              name="pageSize"
                              onChange={handlePageTransactionSizeChange}
                              id="pageSize"
                            >
                              {pageSizeOptionsTransaction.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            записей
                          </div>
                        </div>
                        <Pagination
                          count={Math.ceil(
                            clientTransactions?.count /
                              pageSizeTransaction.value
                          )}
                          page={pageTransaction}
                          variant="outlined"
                          shape="rounded"
                          boundaryCount={1}
                          color="primary"
                          onChange={handlePageTransactionChange}
                        />
                      </div>
                    </div>
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
                            onClick={() => {
                              NiceModal.show(clientDepositTopupModal, {
                                id: params.id,
                                name: `${userInfoData?.first_name} ${userInfoData?.last_name}`,
                                deposit: Number(financeData?.balance),
                              });
                            }}
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
                            onClick={() => {
                              NiceModal.show(clientDepositUpdateModal, {
                                id: params.id,
                                name: `${userInfoData?.first_name} ${userInfoData?.last_name}`,
                                deposit: Number(financeData?.balance),
                              });
                            }}
                          >
                            Обновить депозит
                          </Button>
                        </div>
                      </div>
                      <Divider />
                    </div>
                    {clientDepositHistory && (
                      <div className={classes["transactions_table"]}>
                        <Table className={classes.table}>
                          <TableHead>
                            <TableRow>
                              <TableCell>№</TableCell>
                              <TableCell>На депозите</TableCell>
                              <TableCell>Сумма изменения</TableCell>
                              <TableCell>Операция</TableCell>
                              <TableCell>Дата</TableCell>
                              <TableCell>Сотрудник</TableCell>
                              <TableCell>Связь</TableCell>
                              <TableCell>Комментарий</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {clientDepositHistory?.results.map(
                              (result, index) => (
                                <TableRow key={result.id}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>
                                    <p>
                                      {result.on_deposit} <br />{" "}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <p>{result.change_amount} ₸</p>
                                  </TableCell>
                                  <TableCell>
                                    <p>{result.operation}</p>
                                  </TableCell>
                                  <TableCell>
                                    {dayjs(result.date_created).format(
                                      "DD.MM.YYYY"
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Link
                                      className={classes.name_link}
                                      to={`employee/${result.employee}`}
                                    >
                                      {result.employee_full_name} <br />
                                    </Link>
                                    {result.employee_role}
                                  </TableCell>
                                  <TableCell>
                                    <p>-</p>
                                  </TableCell>
                                  <TableCell>{result.comment}</TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                        <div
                          className={classes["transactions_table__container"]}
                        >
                          <div
                            className={
                              classes["transactions_table__container__row"]
                            }
                          >
                            <p
                              className={
                                classes["transactions_table__container__label"]
                              }
                            >
                              Показано {clientDepositHistory?.results.length} из{" "}
                              {clientDepositHistory?.count} записей
                            </p>
                            <div>
                              <div className={classes["tableSettings"]}>
                                Показывать
                                <select
                                  name="pageSize"
                                  onChange={handlePageDepositSizeChange}
                                  id="pageSize"
                                >
                                  {pageSizeOptionsDeposit.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                                записей
                              </div>
                            </div>
                            <Pagination
                              count={Math.ceil(
                                clientDepositHistory?.count /
                                  pageSizeDeposit.value
                              )}
                              page={pageDeposit}
                              variant="outlined"
                              shape="rounded"
                              boundaryCount={1}
                              color="primary"
                              onChange={handlePageDepositChange}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Grid>
          )
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
      case 4:
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
                width: "100%",
              }}
            >
              <div className={classes.membership}>
                <div className={classes.membership__section}>
                  <p className={classes.membership__section__title}>
                    Купленные подарочные сертификаты
                  </p>
                  <Divider />
                </div>
                <MembershipTable />
              </div>

              <div className={classes.membership}>
                <div className={classes.membership__section}>
                  <p className={classes.membership__section__title}>
                    Использованные подарочные сертификаты
                  </p>
                  <Divider />
                </div>
                <p className={classes.membership__noTableText}>
                  Нет активированных сертификатов
                </p>
              </div>

              <div className={classes.membership}>
                <div className={classes.membership__section}>
                  <p className={classes.membership__section__title}>
                    Абонементы
                  </p>
                  <Divider />
                </div>
                <p className={classes.membership__noTableText}>
                  Нет активированных абонементов
                </p>
              </div>
              <div className={classes.membership}>
                <div className={classes.membership__section}>
                  <p className={classes.membership__section__title}>
                    Депозитные абонементы
                  </p>
                  <Divider />
                </div>
                <p className={classes.membership__noTableText}>
                  Нет активированных абонементов
                </p>
              </div>
              <div className={classes.membership}>
                <div className={classes.membership__section}>
                  <p className={classes.membership__section__title}>
                    Составные абонементы
                  </p>
                  <Divider />
                </div>
                <p className={classes.membership__noTableText}>
                  Нет активированных абонементов
                </p>
              </div>
            </div>
          </Grid>
        );
      case 5:
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
                width: "75%",
              }}
            >
              <div style={{ padding: "1.6rem 0rem" }}>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "1rem",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: "2.4rem" }}>Комментарии</p>

                  <div
                    style={{
                      display: "flex",
                      gap: "2rem",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="text"
                      startIcon={
                        <Add sx={{ width: "2.4rem", height: "2.4rem" }} />
                      }
                      className="add-button"
                      sx={{
                        textTransform: "none",
                        padding: "0.4rem 1.6rem",
                        fontSize: "1.4rem",
                        fontWeight: 400,
                        color: "#0B6BCB",
                        gap: "0.4rem",
                      }}
                      onClick={() => {
                        NiceModal.show(clientCommentAddModal);
                      }}
                    >
                      Добавить
                    </Button>
                  </div>
                </div>
                <Divider />
              </div>
              <div>
                <CommentList />
              </div>
            </div>
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
