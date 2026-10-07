import apiClient from "@/lib/apiClient";
import { GoogleLoginPayload, LoginPayload, RegisterPayload, VerifyEmailPayload } from "@/types";

export const registerUser = async (payload: RegisterPayload) => {
  return apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
};

export const verifyEmailUser = async (payload: VerifyEmailPayload) => {
  return apiClient("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
};

export const loginUser = async (payload: LoginPayload) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const getMeUser = async () => {
  return apiClient("/auth/getMe", {
    method: "GET",
  });
};

// export const getMeUser = async () => {
//   const response = await apiClient("/auth/getMe", {
//     method: "GET",
//   });

//   console.log("GET ME API RESPONSE:", response);

//   return response;
// };

export const googleLoginUser = async (payload: GoogleLoginPayload) => {
  return apiClient("/auth/google-login", {
    method: "POST",
    body: payload,
  });
};
export const userLogOut = async () => {
  return apiClient("/auth/logOut", {
    method: "POST",
  });
};
