import {
  HomeOutlined,
  ExitToAppOutlined,
  AccountBalanceWalletOutlined,
  WarningAmberOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";

export const employeeTabsData = [
  { to: "/employees/:id", icon: HomeOutlined, label: "Обзор" },
  { to: "/employees/visits", icon: ExitToAppOutlined, label: "Посещения" },
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
