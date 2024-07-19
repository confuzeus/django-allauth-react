import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { sessionsApi } from "../api/sessions";
import { sessionStore } from "../store/sessions";
import { genericStore } from "../store/generic";
import { CurrentAction } from "../store/generic/types";

export default function useAuthSession() {
  const setIsAuthenticated = useSetAtom(sessionStore.isAuthenticatedAtom);
  const setUser = useSetAtom(sessionStore.userAtom);
  const setIsLoading = useSetAtom(genericStore.isLoadingAtom);
  const setErrors = useSetAtom(genericStore.errorsAtom);
  const setCurrentAction = useSetAtom(genericStore.currentActionAtom);
  const {
    data: session,
    isError,
    isSuccess,
    isPending,
    error,
  } = useQuery({
    queryKey: ["authSession"],
    queryFn: sessionsApi.getSession,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsAuthenticated(true);
      setUser({
        email: session.data.user.email,
        username: session.data.user.username,
        displayName: session.data.user.display,
      });
      setCurrentAction(CurrentAction.Authenticated);
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setCurrentAction(CurrentAction.Signin);
    }

    return () => {
      setIsAuthenticated(false);
      setUser(null);
      setCurrentAction(CurrentAction.Signin);
    };
  }, [isSuccess, session, setIsAuthenticated, setUser, setCurrentAction]);

  useEffect(() => {
    setIsLoading(isPending);

    return () => {
      setIsLoading(false);
    };
  }, [isPending, setIsLoading]);

  useEffect(() => {
    if (isError) {
      setErrors((errors) => [...errors, error]);
    }
  }, [isError, error, setErrors]);
}
