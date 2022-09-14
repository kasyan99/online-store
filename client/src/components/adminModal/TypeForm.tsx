import { TextField } from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { deviceAPI } from "../../api/deviceAPI";
import InputContainer from "./inputs/InputContainer";
import SubmitBtn from "./SubmitBtn";

const TypeForm = () => {
   type Inputs = {
      type: string,
   };
   const addType = (typeName: string) => {
      deviceAPI.createType({ name: typeName }).then(() => resetField('type'))
   }

   const { register, handleSubmit, formState: { errors }, resetField } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = data => addType(data.type);

   const maxLength = 15
   return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)}>
         {/* register your input into the hook by invoking the "register" function */}
         <InputContainer>
            <TextField id={'Type'} label={"Type"} variant="outlined" {...register("type", { required: 'This field is required', maxLength: maxLength })} />
         </InputContainer>

         {errors.type && <span style={{ color: 'red' }}>{errors.type.type === 'maxLength' ? `Max length is ${maxLength}` : errors.type.message}</span>}

         <SubmitBtn />
      </form>
   );
}

export default TypeForm