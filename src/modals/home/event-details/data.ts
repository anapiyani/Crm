import {
  CalendarMonthOutlined,
  Info,
  Man3,
  Restore,
} from "@mui/icons-material";
import { Adjust, Inventory, CardGiftcard } from "@mui/icons-material";

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

export interface TableData {
  id: number;
  visit: string;
  visitTime: string;
  client?: string;
  clientNote?: string;
  services: {
    icon: typeof Adjust;
    name: string;
    employee: string;
    employeeRole: string;
    amount: number;
    discount: number;
    total: number;
    discountText?: string;
    paymentStatus?: string;
  }[];
  grandTotal: number;
  grandTotalCash: number;
  grandTotalCard?: number;
}

export const eventTableData: TableData[] = [
  {
    id: 1,
    visit: "Посещение №721",
    visitTime: "Сегодня, 11:27",
    services: [
      {
        icon: Adjust,
        name: "Услуга (прим. массаж), 60 минут",
        employee: "Имя Фамилия",
        employeeRole: "Врач-массажист",
        amount: 2200,
        discount: 0,
        total: 2200,
        discountText: "Персональная скидка 10%",
        paymentStatus: "Не оплачено",
      },
    ],
    grandTotal: 5200,
    grandTotalCash: 5200,
  },
  {
    id: 2,
    visit: "Посещение №722",
    visitTime: "Сегодня, 12:00",
    services: [
      {
        icon: Adjust,
        name: "Услуга (прим. маникюр), 60 минут",
        employee: "Имя Фамилия",
        employeeRole: "Мастер маникюра",
        amount: 1500,
        discount: 10,
        total: 1350,
      },
    ],
    grandTotal: 2500,
    grandTotalCash: 2500,
  },
];

export const header = ["ID", "Дата и время", "Сотрудник", "Действие", "Было", "Стало"];
export const bodyData = [
  {
    id: 8132,
    dateTime: "2 минуты назад",
    employee: "Имя Фамилия",
    action: "Редактирование",
    before: [{
      employee: " Имя Фамилия",
      date: " 07.05.2020",
      time: " 16:15 - 17:45",
    }],
    after: [{
      employee: " Имя Фамилия",
      date: " 07.05.2020",
      time: " 16:00 - 17:30",
    }],
  },
  // Add more rows as needed
];
