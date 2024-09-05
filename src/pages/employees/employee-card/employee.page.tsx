import React, { useEffect, useState } from "react";
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
  Adjust,
} from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import RevenueChart from "./components/chart";
import { employeeTabsData } from "@/pages/employees/employee-card/data";
import TableHorizontal from "@/components/tables/table-horizontal/horizontal-info-card";
import TableVertical from "@/components/tables/tableVertical/vertical-info-card";
import {
  cardInfoEmplpyee,
  getWalletHistory,
  mainInfoEmployee,
} from "@/service/employee/employee.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import EmployeeVisitsTable from "../employee-visits/visits-table/employee-visits-table";
import SalaryTable, {
  SalaryData,
} from "../employee-salaryAndFines/_components/bonusesTable/tableBonuses";
import { searchVisits } from "@/service/activity/activity.service";
import { TableData } from "../employee-visits/data";
import YearlyCalendar from "@/components/calendar/yearly-calendar/yearly-calendar";
import { getEmployeeScheduleYearly } from "@/service/schedule/schedule.service";
import { useDeleteWallethistory } from "@/service/employee/employee.hook";
import NiceModal from "@ebay/nice-modal-react";
import stepFormModal from "@/modals/step-form/step-form.modal";

const EmployeePage = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [holidays, setHolidays] = useState<string[]>([]);
  const [sickLeaves, setSickLeaves] = useState<string[]>([]);
  const [timeOffs, setTimeOffs] = useState<string[]>([]);
  const [trainings, setTrainings] = useState<string[]>([]);
  const [vacations, setVacations] = useState<string[]>([]);

  const mutationDeleteWalletHistory = useDeleteWallethistory();

  const params = useParams<{ id: string }>();

  const { data: counterCardData, isLoading: counterCardLoading } = useQuery({
    queryKey: ["cardInfoEmplpyee", params.id],
    queryFn: () => cardInfoEmplpyee(Number(params.id)),
  });

  const { data: userInfoData, isLoading: userInfoLoading } = useQuery({
    queryKey: ["mainInfoEmployee", params.id],
    queryFn: () => mainInfoEmployee(Number(params.id)),
  });

  const { data: visitsInfo, isPending: visitsPending } = useQuery({
    queryKey: ["visitsData"],
    queryFn: () =>
      searchVisits({
        bonuses: false,
        cashless_payment: false,
        certificate: false,
        bank_transfer: false,
        employee_ids: params.id,
        id: "",
        service_id: "",
        status: "Любой",
        subscription: false,
        unapproved_materials: false,
        unpaid: false,
        with_products: false,
        amount_from: 0,
        amount_to: 0,
        date_from: "",
        date_to: "",
        ascending_order: false,
        sort_by_date: false,
        sorting: "",
        page: 1,
        page_size: 100,
      }),
  });

  const { data: salaryInfo, isPending: salaryPending } = useQuery({
    queryKey: ["salaryData"],
    queryFn: () => getWalletHistory(params.id!, 1),
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
  ];

  const additionalTableData = [
    { property: "Работает с.", value: userInfoData?.start_date },
    {
      property: "Пол",
      value: userInfoData?.gender ? userInfoData?.gender : "Не указан",
    },
    { property: "Интервал", value: "По умолчанию" },
    { property: "Блокировать", value: "Да" },
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

  const data: TableData[] =
    visitsInfo?.results.map((visit, index) => {
      return {
        id: index + 1,
        visit: visit.id.toString(),
        visitTime: visit.date || "",
        client:
          `${visit.client.first_name} ${visit.client.last_name}` ||
          "Нет данных",
        clientNote: visit.notes || "",
        services: visit.appointment_services.map((service) => {
          return {
            icon: Adjust,
            name: service.service_name,
            employee: visit.employee_name || "Нет данных",
            employeeRole: visit.employee_role,
            amount: Number(visit.service_amount) || 0,
            discount: visit.discount_custom || 0,
            total: Number(service.price) || 0,
            employeeId: visit.employee_id,
            clientId: visit.client.id,
          };
        }),
        grandTotal: visit.total_price,
        grandTotalCash: visit.total_cash,
        grandTotalCard: visit.total_card,
      };
    }) || [];

  const salaryData: SalaryData[] = !salaryInfo
    ? []
    : salaryInfo?.results.map((salary, index) => {
        return {
          number: index + 1,
          salaryItem: salary.description,
          type: salary.type,
          revenue: {
            mainText: salary.revenue,
            subText: "по чеку",
          },
          materials: salary.material_cost,
          salary: salary.salary_change,
          salaryFormula: salary.salary_formula,
          accrued: {
            mainText: salary.date,
            subText: "Автоматически",
          },
          link: `/visits/${salary.appointment}`,
          linkText: salary.appointment_name,
          employee: salary.client_name || "Не указан",
          id: salary.id,
        };
      });

  const getWorkingTime = () => {
    const today = new Date();
    const start_date = userInfoData?.start_date;

    if (start_date) {
      const startDate = new Date(start_date);
      const diff = today.getTime() - startDate.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      return days;
    }
  };

  const getServiceAmount = () => {
    let amount = 0;
    data.forEach((visit) => {
      visit.services.forEach((service) => {
        amount += service.amount;
      });
    });
    return amount;
  };

  const { data: scheduleData, isLoading: scheduleLoading } = useQuery({
    queryKey: ["scheduleData"],
    queryFn: () => getEmployeeScheduleYearly(Number(params.id)),
  });

  const deleteWalletHistory = (id: number) => {
    mutationDeleteWalletHistory.mutate(id);
  };

  const openSalaryTemplateModal = () => {
    NiceModal.show(stepFormModal);
  };

  useEffect(() => {
    if (scheduleData) {
      const workingDaysArray: string[] = [];
      const holidaysArray: string[] = [];
      const sickLeavesArray: string[] = [];
      const timeOffsArray: string[] = [];
      const trainingsArray: string[] = [];
      const vacationsArray: string[] = [];

      scheduleData?.forEach((date) => {
        switch (date.day_status.status) {
          case "working_day":
            workingDaysArray.push(date.date);
            break;
          case "holiday":
            holidaysArray.push(date.date);
            break;
          case "sick_leave":
            sickLeavesArray.push(date.date);
            break;
          case "time_off":
            timeOffsArray.push(date.date);
            break;
          case "learning":
            trainingsArray.push(date.date);
            break;
          case "vacation":
            vacationsArray.push(date.date);
            break;
          default:
            break;
        }
      });

      setWorkingDays(workingDaysArray);
      setHolidays(holidaysArray);
      setSickLeaves(sickLeavesArray);
      setTimeOffs(timeOffsArray);
      setTrainings(trainingsArray);
      setVacations(vacationsArray);
    }
  }, [scheduleData]);

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
                icon={<ContentCut />}
                iconColor="var(--success-main)"
                textTitle="Услуг оказано"
                valueText={getServiceAmount()}
              />
              <CounterCard
                backgroundColor={"rgba(33, 150, 243, 0.3)"}
                icon={<ExitToApp />}
                iconColor="var(--primary-main)"
                textTitle="Посещения"
                valueText={
                  data.map((visit) => visit.id).length.toString() || "0"
                }
              />

              <CounterCard
                backgroundColor={"rgba(156,39,176, 0.3)"}
                icon={<CalendarMonthOutlined />}
                iconColor="var(--secondary-main)"
                textTitle="Последнее посещение"
                valueText={
                  data.length > 0
                    ? data[data.length - 1].visitTime
                    : "Посещений не найдено"
                }
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
                onClick={openSalaryTemplateModal}
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
                textTitleFocus="0 ₸"
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
                textTitleFocus="0 ₸"
              />
              <CounterCard
                backgroundColor="rgba(156, 39, 176, 0.3)"
                icon={<PersonOutlined />}
                iconColor="var(--secondary-main)"
                textTitle="Развитие клиентов"
                valueText="От продаж"
                textTitleFocus="0 ₸"
              />
            </div>
          </Grid>
        );
      case 4: {
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
                valueText={getWorkingTime() + " дней"}
              />
            </div>
            <RevenueChart />
          </Grid>
        );
      }
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
            {visitsInfo && <EmployeeVisitsTable data={data} />}
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
            <SalaryTable
              onDeleteWalletHostry={deleteWalletHistory}
              data={salaryData}
            />
          </Grid>
        );
      case 3:
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
            <h1>Reports n shit</h1>
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
            <div className={classes.calendar_header}>
              <h1>Сегодня - 2 марта</h1>
              <div className={classes.calendar_header__descr}>
                <div className={classes.calendar_header__descr__item}>
                  <div
                    style={{ border: "2px solid rgba(11, 107, 203, 1)" }}
                    className={classes.calendar_header__descr__item__box}
                  ></div>
                  <p>Сегодня</p>
                </div>
                <div className={classes.calendar_header__descr__item}>
                  <div
                    style={{ backgroundColor: "rgba(165, 214, 167, 1)" }}
                    className={classes.calendar_header__descr__item__box}
                  ></div>
                  <p>Рабочие дни</p>
                </div>
                <div className={classes.calendar_header__descr__item}>
                  <div
                    style={{ backgroundColor: "rgba(248, 187, 208, 1)" }}
                    className={classes.calendar_header__descr__item__box}
                  ></div>
                  <p>Праздники</p>
                </div>
                <div className={classes.calendar_header__descr__item}>
                  <div
                    style={{ backgroundColor: "rgba(255, 171, 145, 1)" }}
                    className={classes.calendar_header__descr__item__box}
                  ></div>
                  <p>Больничный</p>
                </div>
                <div className={classes.calendar_header__descr__item}>
                  <div
                    style={{ backgroundColor: "rgba(224, 224, 224, 1)" }}
                    className={classes.calendar_header__descr__item__box}
                  ></div>
                  <p>Отгул</p>
                </div>
                <div className={classes.calendar_header__descr__item}>
                  <div
                    style={{ backgroundColor: "rgba(255, 236, 179, 1)" }}
                    className={classes.calendar_header__descr__item__box}
                  ></div>
                  <p>Обучение</p>
                </div>
                <div className={classes.calendar_header__descr__item}>
                  <div
                    style={{ backgroundColor: "rgba(199, 223, 247, 1)" }}
                    className={classes.calendar_header__descr__item__box}
                  ></div>
                  <p>Отпуск</p>
                </div>
                <Button
                  className={classes.calendar_header__descr__btn}
                  variant="contained"
                  startIcon={<Edit />}
                  sx={{
                    marginLeft: "5rem",
                  }}
                >
                  Редактировать график работы
                </Button>
              </div>
            </div>
            <YearlyCalendar
              working_day={workingDays}
              holidays={holidays}
              sickLeaves={sickLeaves}
              timeOffs={timeOffs}
              trainings={trainings}
              vacations={vacations}
            />
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
