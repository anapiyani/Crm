import { useMutation } from "@tanstack/react-query";
import { login, ILoginResponse, phoneLogin, verifyOtp } from "./auth.service";
import { setTokens } from "@/utils/token";
import toast from "react-hot-toast";

export const useLoginMutation = () => {
  return useMutation<
    ILoginResponse,
    string,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data: ILoginResponse) => {
      if (data && data.access && data.refresh) {
        setTokens(data.access, data.refresh);
        window.location.href = "/";
      } else {
        console.error(
          "Login response does not contain access and refresh tokens",
          data,
        );
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const usePhoneLoginMutation = () => {
  return {
    mutation: useMutation<any, string, { phone: string }>({
      mutationFn: ({ phone }) => phoneLogin(phone),
      onSuccess: (data) => {
        return data;
      },
      onError: (error) => {
        console.log(error);
      },
    }),
  };
};

export const useVerifyOtpMutation = () => {
  return useMutation<
    ILoginResponse,
    string,
    { phone_number: string; otp: string }
  >({
    mutationFn: ({ phone_number, otp }) => verifyOtp(phone_number, otp),
    onSuccess: (data: ILoginResponse) => {
      if (data && data.access && data.refresh) {
        setTokens(data.access, data.refresh);
        window.location.href = "/";
      } else {
        toast.error("Что-то пошло не так повторите еще раз...");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
