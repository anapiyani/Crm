import {
  ICashRegister,
  IKassaOperations,
  IPeriodCashRegister,
  ISearchKassa,
  ISearchKassaResponse,
  IWithdrawal,
} from "@/ts/kassa.interface";
import api from "../api";

export const getOperations = (
  kassa_transaction?: boolean
): Promise<IKassaOperations[]> => {
  const url = kassa_transaction
    ? "/operations/?kassa_transaction=true"
    : "/operations/";
  return api.get(url).then((res) => res.data);
};

export const getCashRegister = (
  formData: ICashRegister
): Promise<IPeriodCashRegister> => {
  const params = new URLSearchParams();
  if (!formData.from_date && !formData.to_date) {
    params.append("today", formData.today.toString());
  } else {
    if (formData.from_date) {
      params.append("from_date", formData.from_date);
    }
    if (formData.to_date) {
      params.append("to_date", formData.to_date);
    }
    params.append("today", formData.today.toString());
  }

  const url = `/period_cash_register/?${params.toString()}`;
  return api.get(url).then((res) => res.data);
};

export const kassaWithdraw = (formData: IWithdrawal): Promise<IWithdrawal> => {
  return api.post("/kassa_withdrawal/", formData).then((res) => res.data);
};

export const kassaDeposit = (formData: IWithdrawal): Promise<IWithdrawal> => {
  return api.post("/kassa_deposit/", formData).then((res) => res.data);
};

export const searchKassaData = (
  formData: ISearchKassa
): Promise<ISearchKassaResponse> => {
  const params = new URLSearchParams();
  if (formData.operation_type) {
    params.append("operation_type", formData.operation_type.toString());
  }
  if (formData.from_amount) {
    params.append("from_amount", formData.from_amount.toString());
  }
  if (formData.to_amount) {
    params.append("to_amount", formData.to_amount.toString());
  }
  if (formData.from_date) {
    params.append("from_date", formData.from_date);
  }
  if (formData.to_date) {
    params.append("to_date", formData.to_date);
  }
  if (formData.money_type) {
    formData.money_type.forEach((type) => {
      params.append("money_type", type);
    });
  }
  const url = `/transactions/list/?${params.toString()}`;
  return api.get(url).then((res) => res.data);
};
