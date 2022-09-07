import { Button, createStyles, makeStyles, Theme } from "@material-ui/core"
import React from 'react';
import DeviceModal from "../components/modal/DeviceModal";
import InputModal from "../components/modal/InputModal";
import ModalContainer from "../components/modal/ModalContainer";

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
         <ModalContainer modalName="Add Type">
            <InputModal label="Type" />
         </ModalContainer>
         <ModalContainer modalName="Add Type" >
            <InputModal label="Brand" />
         </ModalContainer>
         <DeviceModal />
      </div>
   )
}

export default Admin