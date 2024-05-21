
import { useForm } from "react-hook-form"
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { useAddLecturerMutation } from "./lecturerApiSlice";
import SimpleLoading from "../../common/simpleLoading";
import validator from "validator";
const AddLecturer = () => {

  const [visible, setVisible] = useState(false);
  const { register, handleSubmit, reset } = useForm()
  const [addLecturer, { data, isError, error, isSuccess, isLoading }] = useAddLecturerMutation()
  const onSubmit = (data) => {
    if (handleEmail(data.email)) {
      if(validatePhoneNumber(data.phone)){

        addLecturer(data)
        reset()
        setVisible(false)
      }
      else alert("please enter a valid phone")
      // showSuccess()

  }
  else {
      alert("please enter a valid email")
  }
   
  
  }
  if (isLoading) return (<SimpleLoading />)
  if (isError) return <h2>{error}</h2>
  function handleEmail(email) {
    if (!validator.isEmail(email)) {
        return false
    }
    return true

}

 function validatePhoneNumber  (number){
    const isValidPhoneNumber = validator.isMobilePhone(number)
    return (isValidPhoneNumber)
}
  return (

    <div className="card flex justify-content-center">
      <br /><br />
      <Button label="הוסף מרצה" onClick={() => setVisible(true)} />
      <Dialog header="הוספת מרצה" visible={visible} style={{ minWidth:"15vw" }} onHide={() => setVisible(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText placeholder="שם מרצה" required  {...register("name", { required: true, maxLength: 20 })} />
          <br /><br />


          <InputText label="email" type="email" placeholder="אימייל" {...register("email", { required: true, maxLength: 20 })} />
          <br /><br />
          <InputText label="phone" register={register} placeholder="מספר טלפון"  {...register("phone", { required: true, maxLength: 20 })} />
          {/* <Input label="First Name" register={register} required placeholder="Large"/>
      <Select label="Age" {...register("Age")} /> */}
          <br /><br />
          <Button label="אישור" type="submit" />
        </form>
      </Dialog>
    </div>

  )
}
export default AddLecturer
