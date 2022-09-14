import { makeStyles, createStyles, Theme, Card, Typography, Button } from "@material-ui/core"
import StarRateIcon from '@material-ui/icons/StarRate';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deviceAPI } from "../../api/deviceAPI";
import { IDevice } from "../../models/models";


const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      card: {
         padding: theme.spacing(4),
         '@media(max-width: 800px)': {
            padding: '3vw'
         }
      },
      descrItem: {
         fontSize: 20,
         padding: theme.spacing(4),
         paddingBottom: theme.spacing(2),
         paddingTop: theme.spacing(2),

         '&:nth-child(2n)': {
            background: '#ebebeb'
         },

         '@media(max-width: 800px)': {
            padding: '3vw',
            paddingBottom: '1.5vw',
            paddingTop: '1.5vw',
         }
      },
      headersText: {
         '@media(max-width: 800px)': {
            fontSize: '6vw'
         }
      },
      text: {
         fontSize: 24,
         '@media(max-width: 800px)': {
            fontSize: '4vw'
         }
      },
      img: {
         '@media(max-width: 620px)': {
            width: '100%',
            height: '100%',
            objectFit: 'contain'
         }
      },
      imgCont: {
         height: 250,
         width: '100%',
         alignItems: 'left',
         marginBottom: 10,
         '@media(max-width: 620px)': {
            height: 'auto',
         }
      }

   }),
)

const DevicePage: React.FC = () => {
   const classes = useStyles()
   const [device, setDevice] = useState<IDevice | null>(null)

   const params = useParams()

   useEffect(() => {
      if (params.id) {
         deviceAPI.getOneDevice(params.id).then(data => setDevice(data))

      }
   }, [params])
   console.log('devapi', device);

   const imgUrl = device?.img ? `${process.env.REACT_APP_API_URL}${device?.img}` : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'
   return (
      <>
         <Card className={classes.card} data-testid="card">
            <Typography
               component='h3'
               variant="h3"
               style={{ marginBottom: 10 }}
               className={classes.headersText}
            >
               {device?.name}
            </Typography>

            <div className={classes.imgCont}>
               <img
                  src={imgUrl}
                  alt={device?.name}
                  style={{ height: '100%', objectFit: 'contain' }}
                  className={classes.img}
               />
            </div>
            <Typography
               component='p'
               style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}
               className={classes.text}
            >
               Rating: {device?.rating}
               <StarRateIcon style={{ color: '#fc9512' }} /></Typography>
            <Typography
               component='p'
               style={{ marginBottom: 10 }}
               className={classes.text}
            >
               Price: <b>{device?.price}$</b>
            </Typography>

            <Button variant="contained" color='primary' style={{ background: '#ffa500' }}>Add to basket</Button>
         </Card>
         <Typography
            style={{ marginTop: 25 }}
            component="h2"
            variant="h3"
            className={classes.headersText}
         >
            Characteristic
         </Typography>
         <Card style={{ marginTop: 25 }}>
            {device?.info.map((info) => (
               <Typography className={`${classes.descrItem} ${classes.text}`} key={Date.now() + Math.random()}>{info.title}: {info.description}</Typography>
            ))}
         </Card>
      </>
   )
}

export default DevicePage