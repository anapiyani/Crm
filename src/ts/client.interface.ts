import { IUser } from "./types";

export interface IClientAddForm {
  user: IUser;
  personal_discount_id: number;
  discount_card_id: number;
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
