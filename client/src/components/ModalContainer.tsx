import { Button, createStyles, makeStyles, TextField, Theme } from "@material-ui/core"
import React from 'react';
import Modal from '@material-ui/core/Modal';


//you need to add position relative for parent element 
const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      paper: {
         position: 'absolute',
         width: 400,
         backgroundColor: theme.palette.background.paper,
         border: '2px solid #000',
         boxShadow: theme.shadows[5],
         padding: theme.spacing(2, 4, 3),
      }
   }),
)

type Props = {
   modalName: string,
   children: JSX.Element
}
const ModalContainer: React.FC<Props> = ({ modalName, children }) => {
   const classes = useStyles()

   const [open, setOpen] = React.useState(false);

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const body = (
      <div style={{ left: '50%', top: "10%", transform: 'translate(-50%)' }} className={classes.paper}>
         <h2 id="simple-modal-title">{modalName}</h2>
         {children}
         <div style={{ textAlign: 'right' }}>
            <Button variant='contained' color="primary" style={{ background: 'green' }}>Create</Button>
         </div>
      </div>
   )

   return (
      <>
         <Button variant="outlined" fullWidth onClick={handleOpen}>{modalName}</Button>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
         >
            {body}
         </Modal>
      </>
   )
}

export default ModalContainer