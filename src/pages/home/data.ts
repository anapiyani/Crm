export const calendarStatuses = [
  {
    label: "Выбрано",
    value: "selected",
  },
  {
    label: "Сегодня",
    value: "today",
    bgColor: "transparent",
    borderColor: "var(--primary-500)",
  },
  {
    label: "Рабочие дни",
    value: "workdays",
    bgColor: "#A5D6A7",
  },
  {
    label: "Праздники",
    value: "holidays",
    bgColor: "#F8BBD0",
  },
  {
    label: "Больничный",
    value: "sickLeave",
    bgColor: "#FFAB91",
  },
  {
    label: "Отгул",
    value: "dayOff",
    bgColor: "#E0E0E0",
  },
  {
    label: "Обучение",
    value: "training",
    bgColor: "#FFECB3",
  },
  {
    label: "Отпуск",
    value: "vacation",
    bgColor: "#C7DFF7",
  },
];

export const appoinmentStatuses = [
  {
    label: "Посещение запланировано",
    value: "scheduled",
    bgColor: "var(--primary-500)",
  },
  {
    label: "Посещение завершено, оплачено",
    value: "completed",
    bgColor: "var(--success-500)",
  },
  {
    label: "Посещение идет, клиент в салоне",
    value: "underway",
    bgColor: "var(--deep-purple-400)",
  },
  { label: "Клиент опаздывает", value: "late", bgColor: "var(--danger-500)" },
  {
    label: "Клиент не пришел",
    value: "no_show",
    bgColor: "var(--neutral-500)",
  },
];
