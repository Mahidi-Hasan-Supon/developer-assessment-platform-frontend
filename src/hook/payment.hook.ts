import { useMutation, useQuery } from "@tanstack/react-query";
import { createPayment, getMyPayments } from "@/api/payment.api";

export function useCreatePayment() {
  return useMutation({
    mutationFn: createPayment,
  });
}
export function useMyPayments() {
  return useQuery({
    queryKey: ["my-payments"],
    queryFn: getMyPayments,
  });
}