import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { Button, Container, List, ListItem, ListItemText } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createThingMutation,
  deleteThingMutation,
  listThingsQuery,
} from "../../api/things";

interface CrudThingProps {
  id: number;
}

function DeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteThingMutation,
    onSuccess: () => {
      console.log("Deleted");
      queryClient.invalidateQueries({ queryKey: ["things"] });
    },
    onError: (e) => {
      console.log("error", e);
    },
  });
  return (
    <IconButton
      onClick={() => mutate(id)}
      color="error"
      edge="end"
      aria-label="delete"
    >
      <DeleteIcon />
    </IconButton>
  );
}

function CrudThing({ id }: CrudThingProps) {
  return (
    <ListItem secondaryAction={<DeleteButton id={id} />}>
      <ListItemText primary={`Thing ${id}`} />
    </ListItem>
  );
}

function CrudThings() {
  const { data: things } = useQuery({
    queryFn: listThingsQuery,
    queryKey: ["things"],
  });
  return (
    <List>
      {things && things.map(({ id }) => <CrudThing key={id} id={id} />)}
    </List>
  );
}

function CreateButton() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createThingMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["things"] });
    },
  });
  return (
    <Button variant="contained" color="success" onClick={() => mutate()}>
      Create something
    </Button>
  );
}

export default function CrudBody() {
  return (
    <Container maxWidth="xs" component="section">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <CreateButton />
        </div>
        <CrudThings />
      </div>
    </Container>
  );
}
