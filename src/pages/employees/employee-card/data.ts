import {
  HomeOutlined,
  ExitToAppOutlined,
  AccountBalanceWalletOutlined,
  WarningAmberOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";

export const mainTableData = [
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

export const additionalTableData = [
  { property: "Работает с.", value: "22.06.2020" },
  { property: "Пол", value: "Жен." },
  { property: "Интервал", value: "По умолчанию" },
  { property: "Блокировать", value: "Да" },
];

export const contactsData = [
  { type: "Моб. телефон", contact: "+7 (777) 777-76-66", primary: true },
];

export const addressData = [{ property: "Адрес", value: "Нет данных." }];

export const employeeTabsData = [
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

export const employeeNameData = {
  name: "Карта сотрудника - Гунина Анастасия",
};
