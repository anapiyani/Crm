import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/ts/auth.interface";

export const setTokens = (accessToken: string, refreshToken: string) => {
  accessToken && localStorage.setItem(ACCESS_TOKEN, accessToken);
  refreshToken && localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN) || "";
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN) || "";
};

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
