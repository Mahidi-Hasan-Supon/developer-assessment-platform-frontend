import { getMeUser, googleLoginUser, loginUser, registerUser, userLogOut, verifyEmailUser } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmailUser,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMeUser,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: googleLoginUser,
  });
};

export const useLogOut = () => {
  return useMutation({
    mutationFn: userLogOut,
  });
};
