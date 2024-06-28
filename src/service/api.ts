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

let refreshTokenPromise: Promise<any> | null;

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
  }
);

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();
    if (error.response?.status === 401) {
      if (refreshToken) {
        if (!refreshTokenPromise) {
          refreshTokenPromise = getToken(refreshToken)
            .then((data) => {
              refreshTokenPromise = null;
              return data;
            })
            .catch(() => {
              removeTokens();
              window.location.href = "/login";
              return Promise.reject(error);
            });
        }

        return refreshTokenPromise.then((res) => {
          const { access, refresh } = res;
          setTokens(access, refresh);
          originalRequest.headers.common["Authorization"] = `Bearer ${access}`;
          return api(originalRequest);
        });
      } else {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
