import { getCSRFToken } from "../../../utils/cookies";

export async function logoutMutation() {
  await fetch(
    `${import.meta.env.VITE_API_URL}/_allauth/browser/v1/auth/session`,
    {
      credentials: "include",
      method: "DELETE",
      headers: { "X-CSRFTOKEN": getCSRFToken() || "" },
    },
  );
}
