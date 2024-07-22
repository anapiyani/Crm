import { Adjust, Inventory, CardGiftcard } from "@mui/icons-material";

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

export const data: TableData[] = [
  {
    id: 1,
    visit: "Посещение №721",
    visitTime: "Сегодня, 11:27",
    client: "Имя клиента, ID 24",
    clientNote: "Любит чай",
    services: [
      {
        icon: Adjust,
        name: "Услуга (прим. массаж), 60 минут",
        employee: "Имя Фамилия",
        employeeRole: "Врач-массажист",
        amount: 2200,
        discount: 0,
        total: 2200,
      },
      {
        icon: Inventory,
        name: "Инвентарь из склада (прим. лифтинг крем)",
        employee: "Имя Фамилия",
        employeeRole: "Врач-массажист",
        amount: 2200,
        discount: 0,
        total: 2200,
      },
      {
        icon: CardGiftcard,
        name: "Сертификат: 5000 №0903",
        employee: "Имя Фамилия",
        employeeRole: "Сотрудник",
        amount: 2200,
        discount: 0,
        total: 2200,
      },
    ],
    grandTotal: 10200,
    grandTotalCash: 5200,
    grandTotalCard: 5000,
  },
  {
    id: 2,
    visit: "Посещение №722",
    visitTime: "Сегодня, 12:00",
    client: "Имя клиента, ID 25",
    clientNote: "Любит кофе",
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
      {
        icon: Inventory,
        name: "Инвентарь из склада (прим. крем для рук)",
        employee: "Имя Фамилия",
        employeeRole: "Мастер маникюра",
        amount: 500,
        discount: 5,
        total: 475,
      },
      {
        icon: CardGiftcard,
        name: "Сертификат: 3000 №0904",
        employee: "Имя Фамилия",
        employeeRole: "Сотрудник",
        amount: 3000,
        discount: 0,
        total: 3000,
      },
    ],
    grandTotal: 4825,
    grandTotalCash: 2500,
    grandTotalCard: 2325,
  },
  {
    id: 3,
    visit: "Посещение №723",
    visitTime: "Сегодня, 14:00",
    client: "Имя клиента, ID 26",
    clientNote: "Любит шоколад",
    services: [
      {
        icon: Adjust,
        name: "Услуга (прим. педикюр), 90 минут",
        employee: "Имя Фамилия",
        employeeRole: "Мастер педикюра",
        amount: 2000,
        discount: 0,
        total: 2000,
        discountText: "Персональная скидка 10%",
        paymentStatus: "Не оплачено",
      },
      {
        icon: Inventory,
        name: "Инвентарь из склада (прим. лак для ногтей)",
        employee: "Имя Фамилия",
        employeeRole: "Мастер педикюра",
        amount: 300,
        discount: 0,
        total: 300,
        paymentStatus: "Не оплачено",
      },
      {
        icon: CardGiftcard,
        name: "Сертификат: 1000 №0905",
        employee: "Имя Фамилия",
        employeeRole: "Сотрудник",
        amount: 1000,
        discount: 0,
        total: 1000,
      },
    ],
    grandTotal: 3300,
    grandTotalCash: 1800,
    grandTotalCard: 1500,
  },
  {
    id: 4,
    visit: "Посещение №724",
    visitTime: "Вчера, 16:00",
    client: "Имя клиента, ID 27",
    clientNote: "Любит бегать",
    services: [
      {
        icon: Adjust,
        name: "Услуга (прим. стрижка), 30 минут",
        employee: "Имя Фамилия",
        employeeRole: "Парикмахер",
        amount: 1000,
        discount: 0,
        total: 1000,
      },
      {
        icon: Inventory,
        name: "Инвентарь из склада (прим. шампунь)",
        employee: "Имя Фамилия",
        employeeRole: "Парикмахер",
        amount: 200,
        discount: 0,
        total: 200,
      },
      {
        icon: CardGiftcard,
        name: "Сертификат: 1500 №0906",
        employee: "Имя Фамилия",
        employeeRole: "Сотрудник",
        amount: 1500,
        discount: 0,
        total: 1500,
      },
    ],
    grandTotal: 2700,
    grandTotalCash: 1700,
    grandTotalCard: 1000,
  },
  {
    id: 5,
    visit: "Посещение №725",
    visitTime: "Вчера, 17:30",
    client: "Имя клиента, ID 28",
    clientNote: "Любит плавать",
    services: [
      {
        icon: Adjust,
        name: "Услуга (прим. массаж), 60 минут",
        employee: "Имя Фамилия",
        employeeRole: "Врач-массажист",
        amount: 2500,
        discount: 0,
        total: 2500,
      },
      {
        icon: Inventory,
        name: "Инвентарь из склада (прим. масла)",
        employee: "Имя Фамилия",
        employeeRole: "Врач-массажист",
        amount: 800,
        discount: 0,
        total: 800,
      },
      {
        icon: CardGiftcard,
        name: "Сертификат: 2000 №0907",
        employee: "Имя Фамилия",
        employeeRole: "Сотрудник",
        amount: 2000,
        discount: 0,
        total: 2000,
      },
    ],
    grandTotal: 5300,
    grandTotalCash: 3300,
    grandTotalCard: 2000,
  },
];
