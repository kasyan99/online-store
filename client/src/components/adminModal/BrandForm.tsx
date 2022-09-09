import { TextField } from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { deviceAPI } from "../../api/deviceAPI";
import InputContainer from "./inputs/InputContainer";
import SubmitBtn from "./SubmitBtn";

const BrandForm = () => {
   type Inputs = {
      brand: string,
   }

   const addBrand = (brandName: string) => {
      deviceAPI.createBrand({ name: brandName }).then(() => resetField('brand'))
   }

   const { register, handleSubmit, formState: { errors }, resetField } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = data => addBrand(data.brand);

   return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)}>
         {/* register your input into the hook by invoking the "register" function */}
         <InputContainer>
            <TextField id={'Brand'} label={"Brand"} variant="outlined" {...register("brand", { required: true })} />
         </InputContainer>

         {errors.brand && <span>This field is required</span>}

         <SubmitBtn />

      </form>
   );
}

export default BrandForm