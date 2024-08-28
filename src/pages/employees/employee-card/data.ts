import {
  HomeOutlined,
  ExitToAppOutlined,
  AccountBalanceWalletOutlined,
  WarningAmberOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";

export const employeeTabsData = [
  { to: "/employees/main", icon: HomeOutlined, label: "Обзор" },
  { to: "/employees/", icon: ExitToAppOutlined, label: "Посещения" },
  {
    to: "/employees/",
    icon: AccountBalanceWalletOutlined,
    label: "Зарплата, штрафы, премии, авансы",
  },
  {
    to: "/employees/",
    icon: WarningAmberOutlined,
    label: "Отзывы / жалобы",
  },
  {
    to: "/employees/work-schedule",
    icon: CalendarMonthOutlined,
    label: "график работы",
  },
];
