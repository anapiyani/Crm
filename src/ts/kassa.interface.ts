export type KassaOperationsItem = {
  id: number;
  name: string;
  parent: null | number;
  expense: boolean;
  children: KassaOperationsItem[] | [];
};

export type IKassaOperations = {
  count: number;
  items_per_page: number;
  next: string | null;
  previous: string | null;
  results: KassaOperationsItem[] | [];
};

export interface ICashRegister {
  from_date?: string;
  to_date?: string;
  today: boolean;
}

export interface IPeriodCashRegister {
  expense_card_money: string;
  expense_cash_money: string;
  expense_check_money: string;
  expense_checking_account_money: string;
  income_card_money: string;
  income_cash_money: string;
  income_check_money: string;
  income_checking_account_money: string;
  overall_card_money: string;
  overall_cash_money: string;
  overall_check_money: string;
  overall_checking_account_money: string;
}

export interface IWithdrawal {
  operation_type: number;
  comment?: string;
  amount: string;
  money_type: string;
}

export type TKassaTransaction = {
  operation_category: "none" | "deposit" | "withdraw";
  comment: string;
  amount: string;
  money_type: "cash" | "card" | "check" | "checking_account";
};

export interface ISearchKassa {
  from_date: string;
  to_date: string;
  from_amount: number;
  to_amount: number;
  operation_type: number;
  money_type: string[];
  page: number;
  page_size: number;
}

export interface ISearchKassaResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: KassaResponse[];
}

export interface KassaResponse {
  amount: string;
  amount_after_discount: string;
  appointment: null;
  cash_register: number;
  change: string;
  comment: string;
  customer: null;
  customer_name: string | null;
  deposit: string;
  discount_description: null | string;
  discount_percentage: string;
  employee: null | number;
  employee_name: string | null;
  employees_share: string;
  id: number;
  material_price: string;
  on_deposit: boolean;
  operation_date: string;
  operation_name: string;
  operation_type: number;
  overall_change_in_cash_register: {
    card: string;
    cash: string;
    check: string;
    checking_account: string;
  };
  payments: { money_type: string; amount: string }[];
  services: null;
  type: string;
}

export interface IEmployeeWalletInfo {
  id: number;
  employee: number;
  amount_to_pay: string;
  amount_paid: string;
  last_payment_date: string;
  last_payment_amount: string;
  fixed_part_amount: string;
  floating_part_amount: string;
  client_development_amount: string;
}

export interface ISalaryPayment {
  salary: string;
  type: string;
  salary_entry: string;
  employee: number;
  customer: number;
  withdrawal_method: string | undefined;
  date_from: string;
  date_to: string;
  payment: { money_type: string; amount: string }[];
  nuzhno_vyplatit: string;
}

export interface IIndirectCosts {
  date: string | null;
  money_type: string;
  total_amount_change: string;
  name: string;
}

export interface IIndirectCostsDetails {
  name: string;
  operation_id: number;
  operations: IIndirectCosts[] | null;
}

export interface IIndirectCostsResponse {
  total_expenses: string;
  main_operation_name: string;
  main_operation_id: number;
  details: IIndirectCostsDetails[];
}

export interface IDateRegisters {
  date_from: string;
  date_to: string;
}

export interface IIndirectSumarry {
  expenses_all_time: string;
  accumulated_income_statistics_in_month: string;
  average_expenses_per_month: string;
}

export interface IIndirectForm {
  endDate?: string;
  startDate?: string;
  selectedPeriod: string;
}

export interface IIndirectCategory {
  name: string;
  expense: boolean;
  parent?: number;
}

export interface IResponseKassaNow {
  card_money: string;
  cash_money: string;
  check_money: string;
  checking_account_money: string;
  date_created: string;
  date_updated: string;
  id: number;
  name: string;
  total_money: number;
}

export interface IForecastResult {
  total_revenue: number;
  appointment_details: IAppointmentDetails[];
  daily_revenue: IDailyRevenue[];
}

export interface IAppointmentDetails {
  date: string;
  employee: string;
  end_time: string;
  revenue: number;
  start_time: string;
}

export interface IDailyRevenue {
  date: string;
  revenue: number;
}
