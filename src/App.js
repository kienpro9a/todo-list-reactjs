import Header from "./components/header";
import Section from "./components/section";
import { Container, Box } from '@chakra-ui/react'


function App() {
  return (
    <Container maxW='container.xl' bg='gray.50'>
      <Box padding='4'>
        <Header />
        <Section />
      </Box>
    </Container>
  );
}

export default App;
