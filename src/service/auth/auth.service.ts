import api from "../api";

export interface ILoginResponse {
  access: string;
  refresh: string;
}

export const login = (
  email: string,
  password: string
): Promise<ILoginResponse> => {
  return api.post("/api/auth/", { email, password }).then((res) => {
    return res.data;
  });
};

export const phoneLogin = (phone_number: string): Promise<any> => {
  return api.post("/send-otp/", { phone_number }).then((res) => res.data);
};

export const getToken = (
  refresh: string
): Promise<Omit<ILoginResponse, "refresh">> => {
  return api
    .post("/api/token/refresh/", { refresh })
    .then((res) => {
      console.log("Token refresh response:", res.data);
      return res.data;
    })
    .catch((error) => {
      console.error("Token refresh error:", error);
      throw error; // Re-throw the error to be caught in the interceptor's catch block
    });
};
