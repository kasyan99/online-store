import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import ModalContainer from './ModalContainer';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      formControl: {
         marginBottom: theme.spacing(1),
         minWidth: 120,
      }
   }),
)

type Props = {
   label: string
}
const InputModal: React.FC<Props> = ({ label }) => {
   const classes = useStyles();
   const [value, setValue] = React.useState('');

   const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setValue(event.target.value as string);
   };

   return <>
      <FormControl variant="outlined" className={classes.formControl} fullWidth>
         <TextField id={label} label={label} variant="outlined" value={value} onChange={handleChange} />
      </FormControl>
   </>
}

export default InputModal