import { useMutation } from "@tanstack/react-query";
import { askAssistant } from "@/api/ai.api";

export const useAskAssistant = () => {
  return useMutation({
    mutationFn: askAssistant,
  });
};
