interface SocialAccountProvider {
  id: string;
  name: string;
  flows: Array<"provider_redirect" | "provider_token">;
  client_id: string;
}
interface SocialAccountData {
  providers: SocialAccountProvider[];
}
interface AccountData {
  authentication_method: string;
  is_open_for_signup: boolean;
}
interface ConfigurationData {
  account: AccountData;
  socialaccount: SocialAccountData;
}
interface ConfigurationResponse {
  status: 200;
  data: ConfigurationData;
}
async function getConfigurationQuery(): Promise<ConfigurationResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/_allauth/browser/v1/config`,
    { credentials: "include" },
  );
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(responseData));
  }
  return responseData;
}

export const authApi = {
  getConfigurationQuery,
};
