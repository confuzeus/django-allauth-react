import { Button, ButtonGroup } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

export default function AuthButtonGroup() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ButtonGroup variant="contained" aria-label="Login or Signup">
      <Button
        onClick={() => navigate("/auth/login")}
        variant={location.pathname === "/auth/login" ? "outlined" : "contained"}
      >
        Login
      </Button>
      <Button
        onClick={() => navigate("/auth/signup")}
        variant={
          location.pathname === "/auth/signup" ? "outlined" : "contained"
        }
      >
        Sign Up
      </Button>
    </ButtonGroup>
  );
}
