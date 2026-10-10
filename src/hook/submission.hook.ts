import { getMySubmissions } from "@/api/submission.api";
import { useQuery } from "@tanstack/react-query";

export function useMySubmissions() {
  return useQuery({
    queryKey: ["my-submissions"],
    queryFn: () => getMySubmissions({ page: 1, limit: 20 }),
  });
}
