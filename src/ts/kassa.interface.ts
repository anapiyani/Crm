import { count } from "console";
import { type } from "os";

export interface IKassaOperations {
  children: IKassaOperations[] | [];
  id: number;
  name: string;
  parent: null | number;
}

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
  amount_paid: string;
  amount_to_pay: string;
  employee: number;
  id: number;
  last_payment_amount: string;
  last_payment_date: string | null;
}

export interface ISalaryPayment {
  date_from: string;
  date_to: string;
  employee: number;
  salary: string;
  salary_entry?: string;
  type: string;
  withdrawal_method: string;
  customer: number;
}

export interface IIndirectCosts {
  date: string | null;
  money_type: string;
  total_amount_change: string;
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
