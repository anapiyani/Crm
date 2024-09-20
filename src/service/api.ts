import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  removeTokens,
} from "@/utils/token";
import axios from "axios";
import { getToken } from "./auth/auth.service";

export const api = axios.create({
  baseURL: "https://crm-beauty-salon-94a93ffd62e6.herokuapp.com/",
});

let refreshTokenPromise: Promise<any> | null = null;

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
    const refreshToken = getRefreshToken();
    if ([401].includes(error.response?.status)) {
      if (refreshToken) {
        if (!refreshTokenPromise) {
          refreshTokenPromise = getToken(refreshToken).then((data) => {
            refreshTokenPromise = null;
            return data;
          });
        }

        return refreshTokenPromise
          .then((res) => {
            const { access, refresh } = res;
            setTokens(access, refresh, 0, "", "");
            api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
            return api(originalRequest);
          })
          .catch(() => {
            removeTokens();
            window.location.href = "/login";
            return Promise.reject(error);
          });
      } else {
        removeTokens();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
