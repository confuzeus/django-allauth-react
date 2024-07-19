import {
  GetSessionInvalidSessionResponse,
  GetSessionNotAuthenticatedResponse,
  GetSessionSuccessResponse,
} from "./types";

async function getSession() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/_allauth/browser/v1/auth/session`,
    {
      credentials: "include",
    },
  );
  const responseData:
    | GetSessionSuccessResponse
    | GetSessionNotAuthenticatedResponse
    | GetSessionInvalidSessionResponse = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(responseData));
  }
  return responseData as GetSessionSuccessResponse;
}

export const sessionsApi = { getSession };
