import { getCSRFToken } from "../../../utils/cookies";

export async function signupMutation(details: {
  email: string;
  password: string;
  username: string;
}) {
  await fetch(
    `${import.meta.env.VITE_API_URL}/_allauth/browser/v1/auth/signup`,
    {
      method: "POST",
      credentials: "include",
      headers: { "X-CSRFTOKEN": getCSRFToken() || "" },
      body: JSON.stringify(details),
    },
  );
}
