import {
  IClientAddForm,
  IClientDeposit,
  IClientDepositHistory,
  IClientDepositHistoryResponse,
  IClientDepositTopUp,
  IClientSearch,
  ICreateClientReturn,
} from "@/ts/client.interface";
import api from "../api";

export const addClient = (
  form: IClientAddForm
): Promise<ICreateClientReturn> => {
  return api.post("/users/register-customer/", form).then((res) => res.data);
};

export const getDeposit = (user_id: number): Promise<IClientDeposit> => {
  return api.get(`/deposit/${user_id}/`).then((res) => res.data);
};

export const getDepositHistory = (
  user_id: number
): Promise<IClientDepositHistoryResponse> => {
  return api.get(`/deposit/${user_id}/history/`).then((res) => res.data);
};

export const depositTopUp = (formData: IClientDepositTopUp): Promise<any> => {
  return api.post("/deposit/top-up/", formData).then((res) => res.data);
};

export const depositUpdate = (formData: IClientDepositTopUp): Promise<any> => {
  return api.post("/deposit/replace/", formData).then((res) => res.data);
};

export const searchClient = (search: string): Promise<IClientSearch[]> => {
  const params = new URLSearchParams();
  params.append("search", search);

  return api
    .get(`/users/search_for_customer/?${params.toString()}`)
    .then((res) => res.data);
};
