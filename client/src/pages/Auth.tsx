import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import { Container, FormControl, TextField, Typography } from '@material-ui/core';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/routesConsts';
import { Link, useLocation } from 'react-router-dom';
import NavLink from '../components/NavLink';

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
   }
});



const Auth = () => {
   const location = useLocation()
   const isRegistr = location.pathname === REGISTRATION_ROUTE

   const classes = useStyles();
   return (
      <Container maxWidth="sm">
         <Card className={classes.root}>
            <CardContent className={classes.noPadding}>
               <Typography variant='h4' component="h2" style={{ textAlign: 'center', marginBottom: '3%' }}>
                  {isRegistr ? 'Registration' : 'Authorization'}
               </Typography>
               <FormGroup>
                  <FormControl fullWidth className={classes.formControll}>
                     <TextField label='Email' variant="outlined" />
                  </FormControl>
                  <FormControl fullWidth className={classes.formControll}>
                     <TextField label='Password' variant="outlined" />
                  </FormControl>
               </FormGroup>
            </CardContent>
            <CardActions className={classes.noPadding} style={{ display: 'flex', justifyContent: 'space-between' }}>
               {/* <Link to={REGISTRATION_ROUTE} style={{ color: 'red', textDecoration: 'none' }}>Registration</Link> */}
               <span>
                  {isRegistr ? 'Do you have account?' : 'Do not you have account?'} <NavLink to={isRegistr ? LOGIN_ROUTE : REGISTRATION_ROUTE}>{isRegistr ? 'Sign in' : 'Registration'}</NavLink>
               </span>

               <Button variant="contained" color='primary'>{isRegistr ? 'Sign up' : 'Sign in'}</Button>
            </CardActions>
         </Card>
      </Container>
   );
}

export default Auth