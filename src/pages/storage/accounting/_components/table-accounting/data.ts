export interface QuantitySelectorConfig {
  unit: string;
}

export interface CellConfig {
  visibleText?: boolean;
  isTextFieldVisible?: boolean;
  textFieldLabel?: string;
  textFieldLength?: string;
  quantitySelectors?: QuantitySelectorConfig[];
  hasAdditionalText?: boolean;
  showChangeLabel1?: boolean;
  showChangeLabel2?: boolean;
}

export interface TableRowData {
  cells: CellConfig[];
}

export interface TableConfig {
  headers: CellConfig[];
}

export const tableData1: TableRowData[] = [
  {
    cells: [
      { visibleText: true },
      {
        isTextFieldVisible: true,
        textFieldLabel: "Выберите материал или считайте штрих-код",
        textFieldLength: "50rem",
      },
      {
        isTextFieldVisible: true,
        textFieldLabel: "По умолчанию",
        textFieldLength: "20rem",
        quantitySelectors: [{ unit: "шт." }, { unit: "мл." }],
        showChangeLabel1: true,
      },
      {
        quantitySelectors: [
          { unit: "закуп." },
          { unit: "розн." },
          { unit: "% от закуп." },
        ],
      },
      { isTextFieldVisible: true, textFieldLength: "20rem" },
    ],
  },
];

export const tableData2: TableRowData[] = [
  {
    cells: [
      { visibleText: true },
      {
        isTextFieldVisible: true,
        textFieldLabel: "Выберите материал или считайте штрих-код",
        textFieldLength: "50rem",
      },
      {
        isTextFieldVisible: true,
        textFieldLabel: "По умолчанию",
        textFieldLength: "30rem",
        showChangeLabel1: true,
        quantitySelectors: [{ unit: "шт." }, { unit: "мл." }],
      },
      { isTextFieldVisible: true, textFieldLength: "20rem" },
    ],
  },
];

export const tableData3: TableRowData[] = [
  {
    cells: [
      { visibleText: true },
      {
        isTextFieldVisible: true,
        textFieldLabel: "Выберите материал или считайте штрих-код",
        textFieldLength: "50rem",
      },
      {
        isTextFieldVisible: true,
        textFieldLabel: "По умолчанию",
        textFieldLength: "25rem",
        quantitySelectors: [{ unit: "шт." }, { unit: "мл." }],
        showChangeLabel1: true,
        showChangeLabel2: true,
      },
      { visibleText: true, textFieldLabel: "->" },
      { visibleText: true, showChangeLabel1: true, showChangeLabel2: true },
      { isTextFieldVisible: true, textFieldLength: "20rem" },
    ],
  },
];

export const tableConfig1: TableConfig = {
  headers: [
    { visibleText: true, textFieldLabel: "№" },
    {
      visibleText: true,
      textFieldLabel: "Название",
    },
    {
      isTextFieldVisible: true,
      textFieldLabel: "Эстетика-лицо",
      textFieldLength: "25rem",
    },
    { visibleText: true, textFieldLabel: "Цена" },
    { visibleText: true, textFieldLabel: "Комментарий" },
  ],
};

export const tableConfig2: TableConfig = {
  headers: [
    { visibleText: true, textFieldLabel: "№" },
    {
      visibleText: true,
      textFieldLabel: "Название",
    },
    {
      isTextFieldVisible: true,
      textFieldLabel: "Зал",
      textFieldLength: "30rem",
    },
    { visibleText: true, textFieldLabel: "Комментарий" },
  ],
};

export const tableConfig3: TableConfig = {
  headers: [
    { visibleText: true, textFieldLabel: "№" },
    {
      visibleText: true,
      textFieldLabel: "Название",
    },
    {
      isTextFieldVisible: true,
      textFieldLabel: "Зал",
      textFieldLength: "25rem",
    },
    { visibleText: true, textFieldLabel: "->" },
    { isTextFieldVisible: true, textFieldLabel: "Витрина" },
    { visibleText: true, textFieldLabel: "Комментарий" },
  ],
};
