import { Grid, makeStyles, createStyles, Theme, GridSize, Card, CardActionArea, CardMedia, Typography, CardContent } from "@material-ui/core"
import { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { debounce } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import StarRateIcon from '@material-ui/icons/StarRate';
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/routesConsts";
import { deviceAPI } from "../api/deviceAPI";


const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      card: {
         // padding: theme.spacing(2),
         textAlign: 'center',
         color: theme.palette.text.secondary,
         height: '230px'
      },
      media: {
         height: 140
      },
      flexArea: {
         display: 'flex',
         justifyContent: 'space-between'
      }
   }),
)

const DeviceList = observer(() => {
   const classes = useStyles();
   const { device } = useContext(Context)
   let [winWidth, setWinWidth] = useState(document.documentElement.scrollWidth)

   const navigate = useNavigate()

   //use debounce to avoid a lot of rerenders
   useEffect(() => {
      window.addEventListener('resize',
         debounce(() => {
            setWinWidth(document.documentElement.scrollWidth)
         }, 300)
      )
   }, [])

   useEffect(() => {
      deviceAPI.getDevices().then(devices => device.setDevices(devices.rows))
   }, [device])

   //grid items columns depend on window width
   const calcGridSize = (winWidth: number) => {
      let gridSize: GridSize
      if (winWidth > 1200) {
         gridSize = 3
      } else if (winWidth < 1200 && winWidth > 800) {
         gridSize = 4
      } else if (winWidth < 800 && winWidth > 600) {
         gridSize = 6
      } else {
         gridSize = 12
      }
      return gridSize
   }
   return <Grid container spacing={3}>
      {device.devices.map(device => {
         return <Grid item xs={calcGridSize(winWidth)} key={device.id + Date.now()} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card className={classes.card}>
               <CardActionArea>
                  <CardMedia
                     className={classes.media}
                     image={process.env.REACT_APP_API_URL + device.img}
                     title="Contemplative Reptile"
                  />
                  <CardContent>
                     <Typography gutterBottom variant="h5" component="h2">
                        {device.name}
                     </Typography>
                     <div className={classes.flexArea}>
                        <Typography variant="body2" color="textSecondary" component="p">
                           Price: <b>{device.price}</b>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.flexArea}>
                           {device.rating} <StarRateIcon />
                        </Typography>
                     </div>

                  </CardContent>
               </CardActionArea>
            </Card>
         </Grid>
      })}

   </Grid>
})

export default DeviceList