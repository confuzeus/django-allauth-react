import { Box, Grid, TextField, Button, Container } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupMutation } from "../api/accounts/signup";
import { useSetAtom } from "jotai";
import { genericStore } from "../store/generic";
import { CurrentAction } from "../store/generic/types";
import { useState } from "react";

export default function SignupForm() {
  const queryClient = useQueryClient();
  const setCurrentAction = useSetAtom(genericStore.currentActionAtom);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate } = useMutation({
    mutationFn: signupMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authSession"] });
      setCurrentAction(CurrentAction.Signin);
    },
  });
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate({ email, password, username });
  }
  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
