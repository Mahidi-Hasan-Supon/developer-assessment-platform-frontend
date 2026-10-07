import {
  forgotPasswordUser,
  getMeUser,
  googleLoginUser,
  loginUser,
  registerUser,
  resendForgotPasswordOtp,
  resendVerificationOtp,
  resetPasswordUser,
  userLogOut,
  verifyEmailUser,
} from "@/api";
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

export const useResendVerificationOtp = () => {
  return useMutation({
    mutationFn: resendVerificationOtp,
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

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordUser,
  });
};


export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordUser,
  });
};

// useResendForgotPasswordOtp.ts


export const useResendForgotPasswordOtp = () => {
  return useMutation({
    mutationFn: resendForgotPasswordOtp,
  });
};


