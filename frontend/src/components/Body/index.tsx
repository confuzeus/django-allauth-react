import { useAtomValue } from "jotai";
import LoginForm from "../LoginForm";
import { genericStore } from "../../store/generic";
import { CurrentAction } from "../../store/generic/types";
import { Container } from "@mui/material";
import { sessionStore } from "../../store/sessions";
import LogoutButton from "../LogoutButton";
import CrudBody from "../CrudBody";
import AuthButtonGroup from "../AuthButtonGroup";
import SignupForm from "../SignupForm";

export default function Body() {
  const isAuthenticated = useAtomValue(sessionStore.isAuthenticatedAtom);
  const currentAction = useAtomValue(genericStore.currentActionAtom);
  const isLoading = useAtomValue(genericStore.isLoadingAtom);
  let body;

  if (isLoading) {
    body = <p style={{ textAlign: "center" }}>Loading...</p>;
  } else if (currentAction === CurrentAction.Signin) {
    body = <LoginForm />;
  } else if (currentAction === CurrentAction.Signup) {
    body = <SignupForm />;
  } else if (currentAction === CurrentAction.Authenticated) {
    body = <CrudBody />;
  }

  return (
    <Container component="div">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        {isAuthenticated ? <LogoutButton /> : <AuthButtonGroup />}
      </div>
      {body}
    </Container>
  );
}
