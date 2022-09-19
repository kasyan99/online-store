import { Grid, makeStyles, createStyles, Theme, GridSize, Card, CardActionArea, CardMedia, Typography, CardContent, } from "@material-ui/core"
import { Pagination } from '@material-ui/lab';
import { ChangeEvent, useContext, useEffect } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import StarRateIcon from '@material-ui/icons/StarRate';
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/routesConsts";
import { deviceAPI } from "../api/deviceAPI";
import useWinWidth from "../hooks/useWinWidth";


const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      item: {
      },
      card: {
         textAlign: 'center',
         color: theme.palette.text.secondary,
         width: '100%',
         height: 230,
         '@media(max-width: 800px)': {
            height: 430,
         }
      },
      media: {
         width: '100%',
         height: '70%',
         '&img': {
            width: '100%',
            height: '100%',
            objectFit: 'contain'
         }
         ,
         '@media(max-width: 800px)': {
            height: '90%',
         }
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

   const navigate = useNavigate()

   // useEffect(() => {
   //    deviceAPI.getDevices(null, null, 2, 3).then(data => {
   //       device.setDevices(data.rows)
   //       device.setTotalCount(data.count)
   //    })
   // }, [device])

   useEffect(() => {
      deviceAPI.getDevices(device.selectedType?.id, device.selectedBrand?.id, device.page, device.limit).then(data => {
         device.setDevices(data.rows)
         device.setTotalCount(data.count)
      })
   }, [device, device.page, device.limit, device.selectedType, device.selectedBrand])

   const pageCount = Math.ceil(device.totalCount / device.limit)

   //get window width
   const winWidth = useWinWidth()

   //grid items columns depend on window width
   const calcGridSize = (winWidth: number) => {
      let gridSize: GridSize
      if (winWidth > 1200) {
         gridSize = 3
      } else if (winWidth < 1200 && winWidth >= 930) {
         gridSize = 4
      } else if (winWidth < 930 && winWidth >= 800) {
         gridSize = 6
      } else {
         gridSize = 12
      }
      return gridSize
   }

   const handleChange = (page: number) => {
      device.setPage(page)
   }

   return <>
      <Grid container spacing={3} style={{ paddingBottom: '3%' }}>
         {device.devices.map(device => {
            return <Grid item
               xs={calcGridSize(winWidth)}
               key={device.id + Date.now()}
               onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
               className={classes.item}
            >
               <Card className={classes.card}>
                  <CardActionArea style={{ height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <Pagination
            count={pageCount}
            page={device.page}
            onChange={(e: ChangeEvent<unknown>, page: number) => handleChange(page)}

            variant="outlined"
            shape="rounded"
            style={{ display: 'inline-block' }} />
      </div>
   </>
})

export default DeviceList