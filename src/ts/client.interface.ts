import { IUser } from "./types";

export interface IClientAddForm {
  user: IUser;
  // personal_discount_id: number | null;
  // discount_card_id: number | null;
  category: string;
  occupation: string;
  invite_source: string;
  card_number: string;
  sms_notification: boolean;
  description: string;
  description_as_main_characteristic: boolean;
  employee: number;
}

export interface IPersonalDiscount {
  id: number;
  type: {
    id: number;
    name: string;
    description: string;
  };
  promotion_name: string;
  valid_date: string;
  size: string;
}

export interface IDiscountCard {
  id: number;
  discount_size: string;
  active: boolean;
  name: string;
  type: string;
}

export interface ICreateClientReturn {
  id: number;
  user: IUser;
  personal_discount: IPersonalDiscount;
  discount_card: IDiscountCard;
  first_visit: string;
  category: string;
  occupation: string;
  invite_source: string;
  card_number: string;
  sms_notification: boolean;
  description: string;
  description_as_main_characteristic: boolean;
  employee: number;
}

export interface IEmployee {
  employee_id: number;
  full_name: string;
  email: string;
  position: string;
  city: string;
  start_date: string;
}

export interface IEmployeeDepartment {
  department: string;
  employees: IEmployee[];
}

export interface IClientDeposit {
  balance: number;
  id: number;
  date_updated: string;
}

export interface IClientDepositHistory {
  page: number;
  page_size: number;
  user_id: number;
}

export interface IClientDepositHistoryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IClientHistoryDeposit[];
}

export interface IClientHistoryDeposit {
  id: number;
  employee_full_name: string;
  employee_role: string;
  on_deposit: string;
  change_amount: string;
  operation: string;
  comment: string;
  date_created: string;
  wallet: number;
  employee: number;
  appointment: number;
}
