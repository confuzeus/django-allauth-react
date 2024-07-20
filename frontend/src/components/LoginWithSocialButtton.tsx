import { Button } from "@mui/material";
import { getCSRFToken } from "../utils/cookies";

interface LoginWithSocialButtonProps {
  name: string;
  id: string;
}

export default function LoginWithSocialButton({
  name,
  id,
}: LoginWithSocialButtonProps) {
  function handleClick() {
    const form = document.createElement("form");
    form.style.display = "none";
    form.method = "POST";
    form.action = `${import.meta.env.VITE_API_URL}/_allauth/browser/v1/auth/provider/redirect`;
    const data = {
      provider: id,
      callback_url: "http://localhost:5173",
      csrfmiddlewaretoken: getCSRFToken() || "",
      process: "login",
    };

    Object.entries(data).forEach(([k, v]) => {
      const input = document.createElement("input");
      input.name = k;
      input.value = v;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  }
  return (
    <Button onClick={handleClick} variant="contained">
      Login with {name}
    </Button>
  );
}
