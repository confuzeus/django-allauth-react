import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { useAuthSessionQuery } from "./api/sessions/hooks";
import CrudBody from "./components/CrudBody";
import LoginForm from "./components/LoginForm";
import PrivateRoute from "./components/PrivateRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import SignupForm from "./components/SignupForm";

function Initializer() {
  const { isLoading } = useAuthSessionQuery();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Initializer />}>
          <Route index element={<Navigate to="/app" />} />
          <Route path="auth" element={<PublicOnlyRoute />}>
            <Route index element={<Navigate to="/auth/login" />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
          </Route>
          <Route path="app" element={<PrivateRoute />}>
            <Route index element={<CrudBody />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
