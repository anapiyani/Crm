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
