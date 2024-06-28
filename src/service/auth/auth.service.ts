import api from "../api";

export interface ILoginResponse {
  access: string;
  refresh: string;
}

export const login = (
  email: string,
  password: string
): Promise<ILoginResponse> => {
  return api.post("/auth/", { email, password }).then((res) => res.data);
};

export const getToken = (
  refresh: string
): Promise<Omit<ILoginResponse, "refresh">> => {
  return api.post("/token/refresh/", { refresh }).then((res) => res.data);
};
