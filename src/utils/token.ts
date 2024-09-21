import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/ts/auth.interface";

export const setTokens = (
  accessToken: string,
  refreshToken: string,
  user_id: number,
  full_name: string,
  role: string,
) => {
  accessToken && localStorage.setItem(ACCESS_TOKEN, accessToken);
  refreshToken && localStorage.setItem(REFRESH_TOKEN, refreshToken);
  localStorage.setItem("user_id", user_id.toString());
  localStorage.setItem("full_name", full_name);
  localStorage.setItem("role", role);
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
  localStorage.removeItem("user_id");
  localStorage.removeItem("full_name");
  localStorage.removeItem("role");
};
