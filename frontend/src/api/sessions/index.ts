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
    }
  );
  const responseData:
    | GetSessionSuccessResponse
    | GetSessionNotAuthenticatedResponse
    | GetSessionInvalidSessionResponse = await response.json();

  const okCodes = [200, 401, 410];
  if (okCodes.indexOf(response.status) === -1) {
    throw new Error(JSON.stringify(responseData));
  }
  return { isAuthenticated: responseData.meta.is_authenticated };
}

export const sessionsApi = { getSession };
