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
