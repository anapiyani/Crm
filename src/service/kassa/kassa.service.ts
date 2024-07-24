import {
  ICashRegister,
  IKassaOperations,
  IPeriodCashRegister,
} from "@/ts/kassa.interface";
import api from "../api";
import { IEmployeesData } from "@/ts/employee.interface";

export const getOperations = (): Promise<IKassaOperations[]> => {
  return api.get("/operations/").then((res) => res.data);
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
