import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { CircularProgress, Container, LinearProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { useContext, useEffect, useState } from 'react';
import { userAPI } from './api/userAPI';

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userAPI.check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <LinearProgress style={{ marginTop: '3%' }} />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <AppRouter />
      </Container>
    </BrowserRouter>
  );
})

export default App;
