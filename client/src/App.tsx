import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { Container } from '@material-ui/core';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <AppRouter />
      </Container>
    </BrowserRouter>
  );
}

export default App;
