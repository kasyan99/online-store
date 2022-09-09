import { createStyles, makeStyles, Theme } from "@material-ui/core"
import React from 'react';
import BrandForm from "../components/adminModal/BrandForm";
import DeviceForm from "../components/adminModal/DeviceForm";
import ModalContainer from "../components/adminModal/ModalContainer";
import TypeForm from "../components/adminModal/TypeForm";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         position: 'relative',
         '& button': {
            marginBottom: 20
         }
      }
   }),
)


const Admin: React.FC = () => {
   const classes = useStyles()
   return (
      <div className={classes.root}>
         <ModalContainer modalName="Add Type" >
            <TypeForm />
         </ModalContainer>
         <ModalContainer modalName="Add Brand" >
            <BrandForm />
         </ModalContainer>
         <ModalContainer modalName="Add Device" >
            <DeviceForm />
         </ModalContainer>
      </div>
   )
}

export default Admin