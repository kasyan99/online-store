import React, { useContext, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ModalContainer from './ModalContainer';
import { Context } from '../..';
import InputModal from './InputModal';
import { Button, TextField } from '@material-ui/core';
import { InputFiles } from 'typescript';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      formControl: {
         marginBottom: theme.spacing(1),
         minWidth: 120
      },
      mb: {
         marginBottom: theme.spacing(1),
      }
   }),
);
type SeceltProps = {
   list: { name: string, id: string | number }[]
   name: string
}

const SelectCreator: React.FC<SeceltProps> = ({ list, name }) => {
   const classes = useStyles();

   const [value, setValue] = React.useState('');
   return <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel id={'device' + name}>{name}</InputLabel>
      <Select
         labelId={'device' + name}
         id={'device' + name}
         value={value}
         onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setValue(event.target.value as string);
         }}
         label={name}
      >
         {list.map(item => <MenuItem key={item.id + item.name} value={item.name}>{item.name}</MenuItem>)}
      </Select>
   </FormControl>

}

const DeviceModal: React.FC = () => {

   const [fileName, setFileName] = useState('')
   const [info, setInfo] = useState<Array<{ title: string, descriptions: string, id: number }>>([])

   const addInfo = () => {
      setInfo([...info, { title: '', descriptions: '', id: Math.random() + Date.now() }])
   }

   const removeInfo = (id: number) => {
      setInfo(info.filter(i => i.id !== id))
   }

   const { device } = useContext(Context)

   const classes = useStyles();

   return <ModalContainer modalName="Add device">
      <>
         <SelectCreator list={device.types} name='Type' />
         <SelectCreator list={device.brands} name='Brand' />
         <InputModal label='Device Name' />
         <InputModal label='Device Price' />
         <div className={classes.mb}>
            <Button
               variant="outlined"
               component="label"
               color="primary"
            >
               <span>Upload Imag</span>
               <input
                  type="file"
                  hidden
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files && setFileName(e.target.files[0].name)}
               />
            </Button>
            <span> {fileName}</span>
         </div>
         <Button variant='outlined' color="primary" onClick={addInfo} className={classes.mb}>Add New Property</Button>
         {info.map((i) => {
            return <div className={classes.mb}>
               <InputModal label='Property title' />
               <InputModal label='Property description' />
               <Button variant='outlined' color='secondary' onClick={() => removeInfo(i.id)}>Remove</Button>
            </div>
         })}
      </>

   </ModalContainer>
}

export default DeviceModal