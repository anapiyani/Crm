import {
  ChatOutlined,
  CreditCardOutlined,
  HomeOutlined,
  LocalActivityOutlined,
  PaymentsOutlined,
  ExitToAppOutlined,
} from "@mui/icons-material";

export const mainTableData = [
  { property: "Автосегмент", value: "Не указано" },
  { property: "ID клиента", value: 7 },
  { property: "Категория", value: "Без категории" },
  { property: "Фамилия", value: "Едрес" },
  { property: "Имя", value: "Марина" },
  { property: "Отчество", value: "Владимировна" },
  { property: "Моб. телефон", value: "+ (777) 7777-76-66" },
  { property: "Рассылка SMS", value: "Запрет на рассылку" },
  { property: "Черный список", value: "Нет" },
  { property: "Онлайн запись", value: "Да" },
  { property: "Явка", value: "100% (0 из 48 не пришёл)" },
  { property: "Явка", value: "" },
];

export const additionalInfoTableData = [
  { property: "1-е посещение", value: "08.05.2020" },
  { property: "Род занятий", value: "Не указано" },
  { property: "Дата рождения", value: "07.01.1990" },
  { property: "Возраст", value: "30 лет" },
  { property: "Пол", value: "Жен." },
  { property: "Анкета", value: "Есть" },
  { property: "Договор подписан", value: "Нет" },
  { property: "Привлечение", value: "Нет" },
  { property: "Откуда узнали", value: "Не указано" },
  { property: "Удобство расположения", value: "Не указано" },
  { property: "Город", value: "Не указано" },
  { property: "Дата добавления", value: "08.05.2020, 15:30" },
  { property: "Добавил сотрудник", value: "Наталья Ильченко" },
  { property: "Объединение", value: "Есть" },
  { property: "Салон клиента", value: "" },
];

export const discountsTableData = [
  { property: "Тип скидки", value: "Отсутствует" },
  { property: "Скидка", value: "Отсутствует" },
];

export const financeTableData = [
  {
    property: "Депозит",
    value: "0",
    link: "/clients/deposits/history",
    linkLabel: "История",
  },
  {
    property: "Бонусы",
    value: "0",
    link: "/clients/bonuses/history",
    linkLabel: "История",
  },
  {
    property: "Деп. абонемент",
    value: "0",
    link: "/clients/membership",
    linkLabel: "Подробности",
  },
];

export const contactsTableData = [
  { type: "Моб. телефон", contact: "+7 (777) 777-76-66", primary: true },
];

export const commentsTableData = [{ contact: "Нет ни одного комментария" }];

export const addressData = [{ property: "Адрес", value: "Нет данных." }];

export const sampleVisits = [
  {
    description: "Операционный материал для сотрудников",
    cost: "1000 ₸",
    dateTime: "27 май 2020, 18:15",
    link: "Посмотреть",
  },
  {
    description: "Кофе для сотрудников",
    cost: "200 ₸",
    dateTime: "27 май 2020, 18:10",
    link: "Посмотреть",
  },
];

export const clientsTabsData = [
  { to: "/clients/:id", icon: HomeOutlined, label: "Обзор" },
  { to: "/clients/visits", icon: ExitToAppOutlined, label: "Посещения" },
  {
    to: "/clients/finance",
    icon: PaymentsOutlined,
    label: "Финансы",
  },
  {
    to: "/clients/discounts",
    icon: CreditCardOutlined,
    label: "Скидки",
  },
  {
    to: "/clients/membership",
    icon: LocalActivityOutlined,
    label: "Абонементы / Сертификаты",
  },
  {
    to: "/clients/comments",
    icon: ChatOutlined,
    label: "Комментарии",
  },
];

export const financeChartLabels = ["Июнь", "Июль", "Август", "Сентябрь"];

export const financeChartData = [
  {
    label: "Текущий депозит",
    data: [20, 40, 50, 60],
    borderColor: "#2196F3",
    backgroundColor: "rgba(33, 150, 243, 0.1)",
    yAxisID: "y2",
    fill: true,
  },
  {
    label: "Сумма чека",
    data: [15, 30, 45, 55],
    borderColor: "#F44336",
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    yAxisID: "y1",
    fill: true,
  },
];

export const financeChartLegendLabels = [
  { label: "Текущий депозит", color: "#2196F3" },
  { label: "Сумма чека", color: "#F44336" },
];

export const revenueChartLabels = ["", "Июнь", "Июль", "Август", "Сентябрь"];

export const revenueChartData = [
    {
      label: "Выручка",
      data: [7, 13, 30, 52, 73],
      borderColor: "#4CAF50",
      backgroundColor: "rgba(76, 175, 80, 0.1)",
      yAxisID: "y1",
      fill: true,
    },
    {
      label: "Клиенты",
      data: [7, 15, 38, 50, 60],
      borderColor: "#2196F3",
      backgroundColor: "rgba(33, 150, 243, 0.1)",
      yAxisID: "y2",
      fill: "-1",
    },
  ];

  export const revenueChartLegendLabels = [
    { label: "Выручка", color: "#4CAF50" },
    { label: "Клиенты", color: "#2196F3" },
  ];