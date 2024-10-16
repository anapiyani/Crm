import {
  ICashRegister,
  IDateRegisters,
  IEmployeeWalletInfo,
  IForecastResult,
  IIndirectCategory,
  IIndirectCostsResponse,
  IIndirectSumarry,
  IPeriodCashRegister,
  IResponseKassaNow,
  ISalaryPayment,
  ISearchKassa,
  IWithdrawal,
  KassaOperationsItem,
  KassaResponse,
} from "@/ts/kassa.interface";
import { IResponseData } from "@/ts/types";
import api from "../api";

export const getOperations = async (
  q?: string,
  kassaTransaction = false
): Promise<KassaOperationsItem[]> => {
  const baseUrl = "/operations/";
  const params = new URLSearchParams();

  if (kassaTransaction) {
    params.append("kassa_transaction", "true");
  }

  if (q) {
    params.append("q", q);
  }

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  const response = await api.get<KassaOperationsItem[]>(url);
  return response.data;
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
  formData: ISearchKassa | { customer: number }
): Promise<IResponseData<KassaResponse[]>> => {
  const params = new URLSearchParams();

  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item.toString()));
      } else {
        params.append(key, value.toString());
      }
    }
  });

  const url = `/transactions/list/?${params.toString()}`;
  return api.get(url).then((res) => res.data);
};

export const getEmployeeSalaryWallet = (
  id: number
): Promise<IEmployeeWalletInfo> => {
  return api.get(`/salary-wallet/?user_id=${id}`).then((res) => res.data);
};

export const salaryPayment = (formData: ISalaryPayment): Promise<any> => {
  return api.post("/salary-wallet-payment/", formData).then((res) => res.data);
};

export const getIndirectCosts = (
  formData: IDateRegisters
): Promise<IIndirectCostsResponse[]> => {
  const params = new URLSearchParams();
  if (formData) {
    if (formData.date_from) {
      params.append("date_from", formData.date_from);
    }
    if (formData.date_to) {
      params.append("date_to", formData.date_to);
    }
  }
  return api
    .get(`/indirect_calculations/?${params?.toString()}`)
    .then((res) => res.data);
};

export const getIndirectCostsSummary = (): Promise<IIndirectSumarry> => {
  return api.get("/indirect_calculations/summary/").then((res) => res.data);
};

export const addCategoryIndirectCosts = (
  formData: IIndirectCategory
): Promise<any> => {
  return api.post("/operations/", formData).then((res) => res.data);
};

export const deleteCategoryIndirectCosts = (id: number): Promise<any> => {
  return api.delete(`/operations/${id}/`).then((res) => res.data);
};

export const kassaNow = (id: number): Promise<IResponseKassaNow> => {
  return api.get(`/kassa/`).then((res) => res.data);
};

export const getForecastInfo = ({
  date_from,
  date_to,
}: IDateRegisters): Promise<IForecastResult> => {
  const params = new URLSearchParams();
  if (date_from) {
    params.append("date_from", date_from);
  }
  if (date_to) {
    params.append("date_to", date_to);
  }
  return api
    .get(`/appointments/appointments/revenue-forecast/?${params.toString()}`)
    .then((res) => res.data);
};
