import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { Stack } from "@mui/material";
import LoginWithSocialButton from "./LoginWithSocialButtton";

interface Provider {
  id: string;
  name: string;
  flows: Array<"provider_redirect" | "provider_token">;
  client_id: string;
}

interface SocialProviderProps {
  provider: Provider;
}

function SocialProvider({ provider }: SocialProviderProps) {
  return <LoginWithSocialButton name={provider.name} id={provider.id} />;
}

export default function SocialMethods() {
  const { data: authConfig } = useQuery({
    queryFn: authApi.getConfigurationQuery,
    queryKey: ["authConfig"],
  });

  if (authConfig && authConfig.data?.socialaccount) {
    return (
      <Stack>
        {authConfig.data.socialaccount.providers.map((provider) => (
          <SocialProvider
            provider={provider}
            key={`socialprovider-${provider.name}`}
          />
        ))}
      </Stack>
    );
  }

  return null;
}
