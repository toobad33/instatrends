import "./App.css";
import NavTabs from "./components/NavTabs";
import { Container, Grid, Stack } from "@mantine/core";
import { Headers } from "./components/NavTabs";

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Grid grow gutter="xs" justify="center" align="stretch">
          <Grid.Col
            span={1}
            sx={(theme) => ({backgroundColor: theme.colors.pink[0]})}>
          </Grid.Col>
          <Grid.Col span={3}>
            <Stack sx={(theme) => ({backgroundColor: theme.colors.grape[0]})} style={{ minHeight: 980 }}>
              <Headers />
              <NavTabs />
            </Stack>
          </Grid.Col>
          <Grid.Col
            span={1}
            sx={(theme) => ({backgroundColor: theme.colors.pink[0]})}
          ></Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
