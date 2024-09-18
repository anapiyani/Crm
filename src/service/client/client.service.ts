import {
  IClientAddForm,
  IClientDeposit,
  IClientDepositHistory,
  IClientDepositHistoryResponse,
  ICreateClientReturn,
} from "@/ts/client.interface";
import api from "../api";
import { IUserDetails } from "@/ts/employee.interface";

export const addClient = (
  form: IClientAddForm,
): Promise<ICreateClientReturn> => {
  return api.post("/users/register-customer/", form).then((res) => res.data);
};

export const getDeposit = (user_id: number): Promise<IClientDeposit> => {
  return api.get(`/deposit/${user_id}/`).then((res) => res.data);
};

export const getDepositHistory = (
  formData: IClientDepositHistory,
): Promise<IClientDepositHistoryResponse> => {
  return api
    .get("/deposit-history/", { params: formData })
    .then((res) => res.data);
};
