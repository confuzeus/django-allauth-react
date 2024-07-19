import { Container } from "@mui/material";
import Body from "./components/Body";
import useAuthSession from "./hooks/useAuthSession";

function App() {
  useAuthSession();
  return (
    <Container component="main" sx={{ margin: "10vh auto" }}>
      <h1 style={{ textAlign: "center" }}>React + Allauth</h1>
      <Body />
    </Container>
  );
}

export default App;
