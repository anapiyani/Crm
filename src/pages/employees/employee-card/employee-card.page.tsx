import Tabs from "@/components/tabs/tabs.component";
import {
  HomeOutlined,
  ExitToAppOutlined,
  AccountBalanceWalletOutlined,
  WarningAmberOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";
import TableVertical from "@/components/tables/tableVertical/employee-vertical-info-card";
import TableHorizontal from "@/components/tables/table-horizontal/employee-horizontal-info-card";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

interface TabData {
  to: string;
  icon: typeof HomeOutlined;
  label: string;
}

const EmployeeCard = () => {
  const tabsData: TabData[] = [
    { to: "/employees", icon: HomeOutlined, label: "Обзор" },
    { to: "/employees/visit", icon: ExitToAppOutlined, label: "Посещения" },
    {
      to: "/employees/balance",
      icon: AccountBalanceWalletOutlined,
      label: "Зарплата, штрафы, премии, авансы",
    },
    {
      to: "/employees/reviews",
      icon: WarningAmberOutlined,
      label: "Отзывы / жалобы",
    },
    {
      to: "/employees/work-schedule",
      icon: CalendarMonthOutlined,
      label: "график работы",
    },
  ];

  const mainTableData = [
    { property: "ID сотрудника", value: 6 },
    { property: "Статус", value: "Работает" },
    { property: "Должность", value: "Универсал, Парикмахерский зал" },
    { property: "Фамилия", value: "Гунина" },
    { property: "Имя", value: "Анастасия" },
    { property: "Отчество", value: "Максимовна" },
    { property: "Отобр. онлайн", value: "Да" },
    { property: "Моб. телефон", value: "+ (777) 7777-76-66" },
    { property: "Push-уведомления", value: "Да" },
  ];

  const additionalTableData = [
    { property: "Работает с.", value: "22.06.2020" },
    { property: "Пол", value: "Жен." },
    { property: "Интервал", value: "По умолчанию" },
    { property: "Блокировать", value: "Да" },
  ];

  const contactsData = [
    { type: "Моб. телефон", contact: "+7 (777) 777-76-66", primary: true },
  ];

  const addressData = [{ property: "Адрес", value: "Нет данных." }];

  return (
    <div>
      <Tabs tabsData={tabsData} />
      <Grid
        container
        sx={{
          mb: "5rem",
          ml: { xs: "2rem", xl: "7.6rem" },
          flexDirection: { xs: "column", md: "row" },
        }}
        columnSpacing={{ md: 6 }}
        rowGap={{ xs: 3, md: 0 }}
        xs={9}
        md={12}
      >
        <Grid
          container
          lg={5}
          md={5}
          xl={3.5}
          sx={{ alignItems: "flex-start" }}
        >
          <TableVertical data={mainTableData} title="Главное" showLockIcon />
        </Grid>

        <Grid
          container
          xl={7}
          lg={5}
          md={6}
          sx={{ flexDirection: { xs: "column", xl: "row" } }}
          columnSpacing={{ md: 0, xl: 6 }}
          rowGap={{ xs: 3, xl: 0 }}
        >
          <Grid xl={6}>
            <TableVertical data={additionalTableData} title="Доп. информация" />
          </Grid>

          <Grid container xl={6} sx={{ flexDirection: "column" }} rowGap={3}>
            <TableHorizontal data={contactsData} title="Контакты" />
            <TableVertical data={addressData} title="Адрес проживания" />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeCard;
