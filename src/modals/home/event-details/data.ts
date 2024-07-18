import {
  CalendarMonthOutlined,
  Info,
  Man3,
  Restore,
} from "@mui/icons-material";

export const eventTabs = [
  { to: "/tab1", icon: Info, label: "Запись" },
  { to: "/tab2", icon: Man3, label: "Информация" },
  {
    to: "/tab3",
    icon: CalendarMonthOutlined,
    label: "Посещения",
  },
  {
    to: "/tab4",
    icon: Restore,
    label: "История Изменений",
  },
];
