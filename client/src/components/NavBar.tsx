import React, { useContext, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button } from '@material-ui/core';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/routesConsts';
import NavLink from './NavLink';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         flexGrow: 1,
         marginBottom: '24px'
      },
      menuButton: {
         marginRight: theme.spacing(2),
      },
      title: {
         flexGrow: 1,
         '& a': {
            color: 'white',
            textDecoration: 'none'
         },
      }
   }),
);

const NavBar = observer(() => {
   const { user } = useContext(Context)
   const classes = useStyles();
   const [auth, setAuth] = React.useState(user.isAuth);
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const navigate = useNavigate()

   const logOut = () => {
      user.setUser(null)
      user.setIsAuth(false)
      handleClose()
      navigate(LOGIN_ROUTE, { replace: true })
   }

   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   useEffect(() => {
      setAuth(user.isAuth)
   }, [user.isAuth])

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar className='MuiContainer-root MuiContainer-maxWidthLg'>
               {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
               </IconButton> */}
               <Typography variant="h6" className={classes.title} >
                  <Link to={SHOP_ROUTE}>Online Store</Link>
               </Typography>

               {auth && (
                  <div>
                     {user.user?.role === 'ADMIN' &&
                        <Button variant='contained' style={{ cursor: 'pointer' }}>
                           <Link to={ADMIN_ROUTE} style={{ textDecoration: 'none', color: 'black' }}>Admin</Link>
                        </Button>
                     }
                     <IconButton >
                        <Badge badgeContent={4} color="secondary" overlap="rectangular">
                           <ShoppingCartIcon style={{ color: 'white' }} />
                        </Badge>
                     </IconButton>
                     <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                     >
                        <AccountCircle />
                     </IconButton>
                     <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                     >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={logOut}>Log Out</MenuItem>
                     </Menu>
                  </div>

               )}
               {
                  !auth && <div>
                     <Button variant="contained" color="default">
                        <NavLink to={LOGIN_ROUTE} style={{ color: 'black', textDecoration: 'none' }}>Sign in</NavLink>
                     </Button>
                  </div>
               }

            </Toolbar>
         </AppBar>
      </div>
   );
})


export default NavBar