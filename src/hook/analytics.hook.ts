import { useQuery } from "@tanstack/react-query";
import {
    getAdminAnalytics,
  getCandidateAnalytics,
  getCompanyAnalytics,
} from "@/api/analytics.api";

export function useCompanyAnalytics() {
  return useQuery({
    queryKey: ["analytics", "company"],
    queryFn: getCompanyAnalytics,
    staleTime: 60 * 1000,
  });
}

export function useCandidateAnalytics() {
  return useQuery({
    queryKey: ["analytics", "candidate"],
    queryFn: getCandidateAnalytics,
    staleTime: 60 * 1000,
  });
}


export function useAdminAnalytics() {
  return useQuery({
    queryKey: ["analytics", "admin"],
    queryFn: getAdminAnalytics,
    staleTime: 60 * 1000,
  });
}
