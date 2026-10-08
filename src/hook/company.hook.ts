import {
  createCompanyApplication,
  getCompanyApplications,
  updateCompanyApplicationStatus,
} from "@/api/company.api";
import { CompanyStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateCompanyApplication = () => {
  return useMutation({
    mutationFn: createCompanyApplication,
  });
};

export const useCompanyApplications = (status?: CompanyStatus) => {
  return useQuery({
    queryKey: ["company-applications", status ?? "ALL"],
    queryFn: () => getCompanyApplications(status),
  });
};

export const useUpdateCompanyStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompanyApplicationStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company-applications"],
      });
    },
  });
};
