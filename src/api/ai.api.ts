import { $fetch } from "ofetch";

export interface AskAssistantPayload {
  question: string;
}

export interface AskAssistantResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    answer: string;
  };
}

const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URI?.replace(
  /\/+$/,
  "",
);

function getAiEndpoint() {
  if (!configuredBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URI is not configured");
  }

  const baseUrl = configuredBaseUrl.endsWith("/api/v1")
    ? configuredBaseUrl
    : `${configuredBaseUrl}/api/v1`;

  return `${baseUrl}/ai/ask`;
}

export const askAssistant = async (
  payload: AskAssistantPayload,
): Promise<AskAssistantResponse> => {
  return $fetch<AskAssistantResponse>(getAiEndpoint(), {
    method: "POST",
    body: payload,
    credentials: "include",
  });
};
