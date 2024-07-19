import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutMutation } from "../api/accounts/logout";

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: logoutMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authSession"] });
    },
  });
  return (
    <Button onClick={() => mutate()} variant="contained">
      Logout
    </Button>
  );
}
