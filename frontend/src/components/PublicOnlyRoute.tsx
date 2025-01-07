import { Navigate, Outlet } from "react-router";
import { useAuthSessionQuery } from "../api/sessions/hooks";
export default function PublicOnlyRoute() {
  const { data } = useAuthSessionQuery();

  if (data?.isAuthenticated) {
    return <Navigate to="/app" />;
  }

  return <Outlet />;
}
