import { getToken } from "@/utils/token";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://crm-beauty-salon-94a93ffd62e6.herokuapp.com/api",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
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
  (response) => response,
  async (error) => {
    if ([401, 403].includes(error.response.status)) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
