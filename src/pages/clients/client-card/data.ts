import { HomeOutlined } from "@mui/icons-material";

export const clientTabsData = [
  { to: "/clients", icon: HomeOutlined, label: "Обзор" },
];

export const clientNameData = {
  name: "Карта клиента - Марина Владимировна",
};

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
