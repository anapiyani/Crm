// Overview Table Data
export const overviewData = [
  { property: "Артикул", value: "5648451320" },
  { property: "Штрих-код", value: "84040000064888000000" },
  {
    property: "Наименование",
    value: "0/6 жемчужный Color fresh 75 мл арт. 5648451320",
  },
  {
    property: "Альт. название",
    value: "SEBMIN Моделирующий лак, 200",
  },
  {
    property: "Описание",
    value: "Не указано",
    link: "#",
    linkLabel: "+ Добавить поставщика",
  },
];

// Price Table Data

// Bonus Table Data

// Discount Table Data
export const discountData = [];

// Normatives Table Data
export const normativesData = [
  { name: "Мелирование на фольгу", amount: "от 0 до 10 мл" },
  { name: "Коррекция длины волос", amount: "0 мл" },
];

// Measurement Table Data
export const measurementData = [
  { property: "Ед. измер., материал", value: "мл" },
  { property: "Объем", value: "75 мл" },
  { property: "Объем норматива", value: "7 мл" },
  { property: "Вес тары", value: "5 мл" },
];

// Product Table Data
export const productData = [{ property: "Может быть товаром", value: "Нет" }];

// Floating Price Table Data
export const floatingPriceData = [
  { from: 10, to: 20, cost: 100, unit: "₸" },
  { from: 10, to: 20, cost: 100, unit: "₸" },
];

// Photo Section (Placeholder)
export const photoData = [
  {
    property: "Фотография",
    value: "",
    link: "#",
    linkLabel: "+ Добавить файлы",
  },
];

// Purchase History Table Data
export const purchaseHistoryData = [
  {
    number: 1,
    date: "20 мая, 16:36",
    action: "Инвентаризация №1458",
    actionLink: "#",
    price: "-",
    employee: "Анна Руссо",
    employeeLink: "#",
  },
  {
    number: 2,
    date: "20 мая, 16:36",
    action: "Инвентаризация №1458",
    actionLink: "#",
    price: "-",
    employee: "Анна Руссо",
    employeeLink: "#",
  },
  {
    number: 3,
    date: "20 мая, 16:36",
    action: "Инвентаризация №1458",
    actionLink: "#",
    price: "-",
    employee: "Анна Руссо",
    employeeLink: "#",
  },
];

// Табличный Вид
export const tableViewHeaders = [
  { id: "number", label: "№" },
  { id: "article", label: "Артикул" },
  { id: "barcode", label: "Штрих-код" },
  { id: "name", label: "Название" },
  { id: "purchaseCost", label: "Закупочная стоимость" },
  { id: "retailCost", label: "Розничная стоимость" },
  { id: "wholesalePrice", label: "Оптовая цена" },
  { id: "canBeProduct", label: "Может быть товаром" },
  { id: "unit", label: "Ед. измерения" },
  { id: "volume", label: "Объем" },
  { id: "tara", label: "Тара" },
  { id: "actions", label: "Действия" }, // Add this header for actions
];

export const tableViewData = [
  {
    number: 1,
    article: "99756522",
    barcode: "4057806700700",
    name: "Estel шампунь",
    purchaseCost: "1 100 руб.",
    retailCost: "1 100 руб.",
    wholesalePrice: "1 100 руб.",
    canBeProduct: "Да",
    unit: "шт.",
    volume: "120 мл",
    tara: "0 г",
    actions: "", // This field can be empty as it is handled in the component
  },
  // Add more data rows as needed
];
