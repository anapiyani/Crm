import { IClientAddForm, ICreateClientReturn } from "@/ts/client.interface";
import api from "../api";



export const addClient = (
    form: IClientAddForm
  ): Promise<ICreateClientReturn> => {
    return api.post("/users/register-customer/", form).then((res) => res.data);
  };