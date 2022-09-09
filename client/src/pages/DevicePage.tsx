import { Grid, makeStyles, createStyles, Theme, Card, Typography, Button } from "@material-ui/core"
import StarRateIcon from '@material-ui/icons/StarRate';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deviceAPI } from "../api/deviceAPI";


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
   const [device, setDevice] = useState<any>({ info: [] })

   const params = useParams()

   // const description = [
   //    { id: 1, title: 'Memory', descriptiop: '5 gb' },
   //    { id: 2, title: 'Camera', descriptiop: '12 mp' },
   //    { id: 3, title: 'Proccesor', descriptiop: 'Petiym 3' },
   //    { id: 4, title: 'I count', descriptiop: '8' },
   //    { id: 5, title: 'Accumulator', descriptiop: '30000' },
   // ]

   useEffect(() => {
      if (params.id) {
         deviceAPI.getOneDevice(params.id).then(data => setDevice(data))
      }
   }, [params])
   const imgUrl = device?.img ? `${process.env.REACT_APP_API_URL}${device?.img}` : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'
   return (
      <>
         <Card className={classes.card} >
            <Grid container>
               <Grid item xs={3}>
                  <div style={{
                     // height: 450,
                  }}>
                     <img src={imgUrl} alt={device?.name} style={{ width: '100%' }} />
                  </div>
               </Grid>
               <Grid item xs={3} style={{ paddingLeft: 25, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }} >
                  <div>
                     <Typography component='h3' variant="h3">{device?.name}</Typography>
                     <Typography component='p' style={{ fontSize: 24, marginTop: 10, display: 'flex', alignItems: 'center' }}>Rating: {device?.rating}<StarRateIcon style={{ color: '#fc9512' }} /></Typography>
                     <Typography component='p' style={{ fontSize: 24, marginTop: 10 }}>Price: <b>{device?.price}$</b></Typography>
                  </div>
                  <Button variant="contained" color='primary' style={{ background: '#ffa500' }}>Add to basket</Button>
               </Grid>
            </Grid>
         </Card>
         <Typography style={{ marginTop: 25 }} component="h2" variant="h3">Characteristic</Typography>
         <Card style={{ marginTop: 25 }}>
            {device.info.map((info: any) => (
               <Typography className={classes.descrItem} key={Date.now() + Math.random()}>{info.title}: {info.description}</Typography>
            ))}
         </Card>
      </>

   )
}

export default DevicePage