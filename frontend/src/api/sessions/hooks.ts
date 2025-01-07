import { useQuery } from "@tanstack/react-query";
import { sessionsApi } from ".";

export function useAuthSessionQuery() {
  return useQuery({
    queryKey: ["authSession"],
    queryFn: sessionsApi.getSession,
  });
}
