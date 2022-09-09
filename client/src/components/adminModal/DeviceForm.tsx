import { Button, createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Context } from "../..";
import { deviceAPI } from "../../api/deviceAPI";
import InputContainer from "./inputs/InputContainer";
import ModalSelect from "./inputs/ModalSelect";
import SubmitBtn from "./SubmitBtn";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      mb: {
         marginBottom: theme.spacing(1),
      }
   }),
);

type Props = {
   closeModal?: () => void
}
const DeviceForm: React.FC<Props> = observer(({ closeModal }) => {

   type Inputs = {
      deviceType: string,
      deviceBrand: string,
      deviceName: string,
      devicePrice: string,
   };

   const methods = useForm<Inputs>();
   const { register, handleSubmit, formState: { errors } } = methods;
   //create device
   const onSubmit: SubmitHandler<Inputs> = data => {
      const brandId = getBrandId(data.deviceBrand).toString()
      const typeId = getTypeId(data.deviceType).toString()

      addDevice(data, brandId, typeId)
   }

   //create device on server
   const addDevice = (data: Inputs, brandId: string, typeId: string) => {
      const formData = new FormData()

      formData.append('name', `${data.deviceName}`)
      formData.append('price', `${data.devicePrice}`)
      formData.append('img', file)
      formData.append('brandId', brandId)
      formData.append('typeId', typeId)
      formData.append('info', JSON.stringify(info))

      deviceAPI.createDevice(formData).then(() => closeModal && closeModal())
   }

   const { device } = useContext(Context)

   /*Get brands and types lists for select*/
   useEffect(() => {
      deviceAPI.getTypes().then(types => device.setTypes(types))
      deviceAPI.getBrands().then(brands => device.setBrands(brands))
   }, [device])

   const [file, setFile] = useState<any>(null)
   const [info, setInfo] = useState<Array<{ title: string, descriptions: string, id: number }>>([])

   //add title and description for propery
   const addInfo = () => {
      setInfo([...info, { title: '', descriptions: '', id: Math.random() + Date.now() }])
   }
   const changeInfo = (key: string, value: string, number: number) => {
      setInfo(info.map(i => i.id === number ? { ...i, [key]: value } : i))
   }

   //remove property
   const removeInfo = (id: number) => {
      setInfo(info.filter(i => i.id !== id))
   }

   //get selected brand id
   const getBrandId = (brand: string) => {
      let brandId = -1
      device.brands.forEach(b => b.name === brand ? brandId = b.id : void 0)
      return brandId
   }

   //get selected type id
   const getTypeId = (type: string) => {
      let typeId = -1
      device.types.forEach(t => t.name === type ? typeId = t.id : void 0)
      return typeId
   }

   const classes = useStyles()

   return (
      <>

         {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
         <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)} >
               {/* register your input into the hook by invoking the "register" function */}
               {/*to use "register" function in "SelectModal" you should put input name and options into 'registerInput'*/}
               <ModalSelect list={device.types} labelName='Type' registerInput={{ name: 'deviceType', options: { required: true } }} />
               <ModalSelect list={device.brands} labelName='Brand' registerInput={{ name: 'deviceBrand', options: { required: true } }} />
               <InputContainer>
                  <TextField id={'deviceName'} label={"Device Name"} variant="outlined" {...register("deviceName", { required: true })} />
               </InputContainer>
               <InputContainer>
                  <TextField id={'devicePrice'} label={"Device Price"} variant="outlined" {...register("devicePrice", { required: true })} />
               </InputContainer>

               {/*button that upload img*/}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files && setFile(e.target.files[0])}
                     />
                  </Button>
                  <span> {file?.name}</span>
               </div>

               {/* inputs for property title and descriptions*/}
               {info.map((i) => {
                  return <div className={classes.mb} key={i.id}>
                     <InputContainer>
                        <TextField
                           id={'propertyTitle' + i.id}
                           label={"Property Title"}
                           variant="outlined"
                           value={i.title}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => { changeInfo('title', e.target.value, i.id); e.target.focus() }}
                        />
                     </InputContainer>
                     <InputContainer>
                        <TextField
                           id={'propertyDescription' + i.id}
                           label={"Property Description"}
                           variant="outlined"
                           value={i.descriptions}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeInfo('descriptions', e.target.value, i.id)}
                        />
                     </InputContainer>
                     <Button variant='outlined' color='secondary' onClick={() => removeInfo(i.id)}>Remove Property</Button>
                  </div>
               })}

               {/*button that creates inputs for property title and descriptions*/}
               <Button variant='outlined' color="primary" onClick={addInfo} className={classes.mb}>Add New Property</Button>


               {errors.deviceName && <span>This field is required</span>}

               <SubmitBtn />
            </form>
         </FormProvider>
      </>
   );
})

export default DeviceForm