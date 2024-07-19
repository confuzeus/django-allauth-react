import { ButtonGroup, Button } from "@mui/material";
import { genericStore } from "../store/generic";
import { CurrentAction } from "../store/generic/types";
import { useAtom } from "jotai";

export default function AuthButtonGroup() {
  const [currentAction, setCurrentAction] = useAtom(
    genericStore.currentActionAtom,
  );

  return (
    <ButtonGroup variant="contained" aria-label="Login or Signup">
      <Button
        onClick={() => setCurrentAction(CurrentAction.Signin)}
        variant={
          currentAction === CurrentAction.Signin ? "outlined" : "contained"
        }
      >
        Login
      </Button>
      <Button
        onClick={() => setCurrentAction(CurrentAction.Signup)}
        variant={
          currentAction === CurrentAction.Signup ? "outlined" : "contained"
        }
      >
        Sign Up
      </Button>
    </ButtonGroup>
  );
}
