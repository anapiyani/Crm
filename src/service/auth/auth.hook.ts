import { useMutation } from "@tanstack/react-query";
import { login, ILoginResponse } from "./auth.service";
import { setToken } from "@/utils/token";

export const useLoginMutation = () => {
  return useMutation<
    ILoginResponse,
    string,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data: ILoginResponse) => {
      setToken(data.access);
      window.location.href = "/";
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
