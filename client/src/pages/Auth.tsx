import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import { Container, FormControl, TextField, Typography } from '@material-ui/core';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/routesConsts';
import { useLocation, useNavigate } from 'react-router-dom';
import NavLink from '../components/NavLink';
import { userAPI } from '../api/userAPI';
import { ChangeEvent, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { AxiosError } from 'axios';
import { IUser } from '../models/models';

const useStyles = makeStyles({
   root: {
      minWidth: 275,
      marginTop: '10%',
      padding: '5%'
   },
   noPadding: {
      padding: 0
   },
   formControll: {
      marginBottom: '3%'
   },
   text: {
      '@media(max-width: 500px)': {
         display: 'none'
      }
   }
});

const Auth = observer(() => {
   const classes = useStyles();

   const { user } = useContext(Context)
   const location = useLocation()
   const navigate = useNavigate()
   const onRegistr = location.pathname === REGISTRATION_ROUTE
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')

   const onClick = async () => {

      try {
         let data: IUser

         if (onRegistr) {
            data = await userAPI.registration(email, password)
         } else {
            data = await userAPI.login(email, password)
         }
         user.setUser(data)
         user.setIsAuth(true)

         navigate(SHOP_ROUTE, { replace: true })

      } catch (e: unknown) {
         if (e instanceof AxiosError) {
            alert(e.response?.data.message)

         }
      }
   }

   const changeValue = (setValue: (value: string) => void) => {
      return (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
   }

   return (
      <Container maxWidth="sm">
         <Card className={classes.root}>
            <CardContent className={classes.noPadding}>
               <Typography variant='h4' component="h2" style={{ textAlign: 'center', marginBottom: '3%' }}>
                  {onRegistr ? 'Registration' : 'Authorization'}
               </Typography>
               <FormGroup>
                  <FormControl fullWidth className={classes.formControll}>
                     <TextField label='Email' variant="outlined" placeholder='Enter your email...' value={email} onChange={changeValue(setEmail)} />
                  </FormControl>
                  <FormControl fullWidth className={classes.formControll}>
                     <TextField label='Password' variant="outlined" type='password' placeholder='Enter your password...' value={password} onChange={changeValue(setPassword)} />
                  </FormControl>
               </FormGroup>
            </CardContent>
            <CardActions className={classes.noPadding} style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span>
                  <span className={classes.text}>{onRegistr ? 'Do you have account?' : 'Do not you have account?'}</span> <NavLink to={onRegistr ? LOGIN_ROUTE : REGISTRATION_ROUTE}>{onRegistr ? 'Sign in' : 'Registration'}</NavLink>
               </span>

               <Button variant="contained" color='primary' onClick={onClick}>{onRegistr ? 'Sign up' : 'Sign in'}</Button>
            </CardActions>
         </Card>
      </Container>
   );
})

export default Auth