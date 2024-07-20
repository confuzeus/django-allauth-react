import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutMutation } from "../api/accounts/logout";
import { useSetAtom } from "jotai";
import { genericStore } from "../store/generic";

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const setIsLoading = useSetAtom(genericStore.isLoadingAtom);
  const { mutate } = useMutation({
    mutationFn: logoutMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authSession"] });
      setIsLoading(true);
    },
  });
  return (
    <Button onClick={() => mutate()} variant="contained">
      Logout
    </Button>
  );
}
