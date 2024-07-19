import { getCSRFToken } from "../../../utils/cookies";
import { LoginCredentials } from "./types";

class ErrorResponse extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = 500;
  }
}

export async function loginMutation(credentials: LoginCredentials) {
  const csrfToken = getCSRFToken();
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/_allauth/browser/v1/auth/login`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(credentials),
      headers: { "X-CSRFTOKEN": csrfToken || "" },
    },
  );

  const responseData = await response.json();

  if (!response.ok) {
    const error = new ErrorResponse(JSON.stringify(responseData));
    error.status = response.status;
    throw error;
  }

  return responseData;
}
