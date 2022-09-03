import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DeviceList from '../components/DeviceList';
import FilterSection from '../components/FilterSection';

const useStyles = makeStyles(() =>
   createStyles({
      root: {
         flexGrow: 1,
      }
   }),
);


const Shop: React.FC = () => {
   const classes = useStyles();

   return (
      <Grid container className={classes.root} spacing={3}>
         <Grid item xs={3} >
            <aside >
               <FilterSection />
            </aside>
         </Grid>
         <Grid item xs={9}>
            <main>
               <DeviceList />
            </main>
         </Grid>

      </Grid>
   )
}

export default Shop