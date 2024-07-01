import Tabs from "@/components/tabs/tabs.component";
import {
  HomeOutlined,
  ExitToAppOutlined,
  AccountBalanceWalletOutlined,
  WarningAmberOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";
import TableVertical from "@/components/tables/tableVertical/table-vertical";
import TableHorizontal from "@/components/tables/table-horizontal/table-horizontal";

interface TabData {
  to: string;
  icon: typeof HomeOutlined;
  label: string;
}

const EmployeeSearch = () => {
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          paddingLeft: "7.6rem",
        }}
      >
        <TableVertical data={mainTableData} title="Главное" showLockIcon />
        <div>
          <TableVertical data={additionalTableData} title="Доп. информация" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <TableHorizontal data={contactsData} title="Контакты" />
          <TableVertical data={addressData} title="Адрес проживания" />
        </div>
      </div>
    </div>
  );
};

export default EmployeeSearch;
