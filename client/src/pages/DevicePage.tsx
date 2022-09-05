import { Grid, makeStyles, createStyles, Theme, Card, Typography, Button } from "@material-ui/core"
import { IDevice } from "../models/models"
import StarRateIcon from '@material-ui/icons/StarRate';


const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      card: {
         padding: theme.spacing(4)
      },
      descrItem: {
         fontSize: 20,
         padding: theme.spacing(4),
         paddingBottom: theme.spacing(2),
         paddingTop: theme.spacing(2),
         '&:nth-child(2n)': {
            background: '#ebebeb'
         },
         '&:last-child': {
            // paddingBottom: theme.spacing(4),
         }
      }
   }),
)

const DevicePage: React.FC = () => {
   const classes = useStyles()
   const device: IDevice = {
      id: 1,
      name: "Galaxy A5",
      price: 2500,
      rating: 5,
      img: "https://content.rozetka.com.ua/goods/images/big/166282045.jpg",
   }

   const description = [
      { id: 1, title: 'Memory', descriptiop: '5 gb' },
      { id: 2, title: 'Camera', descriptiop: '12 mp' },
      { id: 3, title: 'Proccesor', descriptiop: 'Petiym 3' },
      { id: 4, title: 'I count', descriptiop: '8' },
      { id: 5, title: 'Accumulator', descriptiop: '30000' },
   ]

   return (
      <>
         <Card className={classes.card} >
            <Grid container>
               <Grid item xs={3}>
                  <div style={{
                     // height: 450,
                  }}>
                     <img src={device.img} alt={device.name} style={{ width: '100%' }} />
                  </div>
               </Grid>
               <Grid item xs={3} style={{ paddingLeft: 25, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }} >
                  <div>
                     <Typography component='h3' variant="h3">{device.name}</Typography>
                     <Typography component='p' style={{ fontSize: 24, marginTop: 10, display: 'flex', alignItems: 'center' }}>Rating: {device.rating}<StarRateIcon style={{ color: '#fc9512' }} /></Typography>
                     <Typography component='p' style={{ fontSize: 24, marginTop: 10 }}>Price: <b>{device.price}$</b></Typography>
                  </div>
                  <Button variant="contained" color='primary' style={{ background: '#ffa500' }}>Add to basket</Button>
               </Grid>
            </Grid>
         </Card>
         <Typography style={{ marginTop: 25 }} component="h2" variant="h3">Characteristic</Typography>
         <Card style={{ marginTop: 25 }}>
            {description.map(info => (
               <Typography className={classes.descrItem}>{info.title}: {info.descriptiop}</Typography>
            ))}
         </Card>
      </>

   )
}

export default DevicePage