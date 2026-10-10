import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types";

export interface CreatePaymentPayload {
  assessmentId: string;
}

export interface CreatePaymentResponse {
  paymentId: string;
  paymentUrl: string;
}

export function createPayment(payload: CreatePaymentPayload) {
  return apiClient<ApiResponse<CreatePaymentResponse>>("/payment/create", {
    method: "POST",
    body: payload,
  });
}


export interface Payment {
  id: string;
  assessmentId: string;
  status: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
  amount: number;
  transactionId: string | null;
  paidAt: string | null;
}

export function getMyPayments() {
  return apiClient<ApiResponse<Payment[]>>("/payment/my-payments");
}

