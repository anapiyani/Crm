import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setAccessToken,
} from "@/utils/token";
import axios from "axios";
import { getToken } from "./auth/auth.service";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "token_not_valid" &&
      originalRequest.url !== "/api/token/refresh/"
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { status, data } = await getToken(refreshToken);
          if (status === 401) {
            removeTokens();
            window.location.replace("/login");
            return;
          } else {
            setAccessToken(data.access);
            api.defaults.headers.common["Authorization"] = `Bearer ${data}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.log("Не удалось обновить токен, перенаправление на логин");
          removeTokens();
          // window.location.replace("/login");
          return Promise.reject(refreshError);
        }
      }
    } else if (error.response?.status === 401) {
      console.log(
        "Отсутствует действительный refreshToken, перенаправление на логин",
      );
      removeTokens();
      window.location.replace("/login");
    }
    return Promise.reject(error);
  },
);

export default api;
