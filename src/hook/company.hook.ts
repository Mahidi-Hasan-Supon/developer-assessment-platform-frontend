import { createCompanyApplication } from "@/api/company.api";
import { useMutation } from "@tanstack/react-query";

export const useCreateCompanyApplication = () => {
  return useMutation({
    mutationFn: createCompanyApplication,
  });
};
