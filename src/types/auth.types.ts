export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: "CANDIDATE" | "COMPANY" | "ADMIN";
      status: "ACTIVE" | "BLOCKED";
    };
    accessToken: string;
    refreshToken: string;
  };
}
export interface ResendVerificationOtpPayload {
  email: string;
}


export interface GoogleLoginPayload {
  credential: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}


export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResendForgotPasswordOtpPayload {
  email: string;
}






