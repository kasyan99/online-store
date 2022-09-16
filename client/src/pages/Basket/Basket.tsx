import { Button, Card, createStyles, makeStyles, Theme, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { userAPI } from "../../api/userAPI"
import { IBasket } from "../../models/models"
import StarRateIcon from '@material-ui/icons/StarRate';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      h2: {
         marginBottom: theme.spacing(2),
         '@media(max-width: 800px)': {
            marginBottom: '2vw',
            fontSize: '6vw'
         }
      },
      card: {
         padding: theme.spacing(4),
         marginBottom: theme.spacing(2),
         '@media(max-width: 800px)': {
            padding: '3vw',
            marginBottom: '2vw'
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
            fontSize: '4vw'
         }
      },
      text: {
         fontSize: 24,
         '@media(max-width: 800px)': {
            fontSize: '3vw'
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
         height: 150,
         width: '100%',
         alignItems: 'left',
         marginBottom: 10,
         '@media(max-width: 620px)': {
            height: 'auto',
         }
      },
      btn: {
         '@media(max-width: 800px)': {
            fontSize: '3vw'
         }
      }

   }),
)

const Basket: React.FC = () => {
   const classes = useStyles()
   // const imgUrl = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'

   const [basket, setBasket] = useState<IBasket[] | null>(null)
   const getBasketDevices = async () => {
      const user = await userAPI.check()
      console.log(user);

      const basket = await userAPI.getBasketDevices(user.id)
      setBasket(basket)
   }
   useEffect(() => {
      getBasketDevices()
      // userAPI.getBasketDevices().then(data => setBasket(data))
   }, [])

   console.log(basket);

   return (
      <>
         <Typography variant="h3" component='h2' className={classes.h2}>Basket</Typography>
         {basket?.map(({ device }) => <Card className={classes.card} data-testid="card" key={Date.now() + Math.random()}>
            <Typography
               component='h3'
               variant="h4"
               style={{ marginBottom: 10 }}
               className={classes.headersText}
            >
               {device?.name}
            </Typography>

            <div className={classes.imgCont}>
               <img
                  src={`${process.env.REACT_APP_API_URL}${device?.img}`}
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

            <Button variant="contained" color='secondary' className={classes.btn}>Remove</Button>
         </Card>)}

      </>
   )
}

export default Basket