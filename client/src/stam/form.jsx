
import { useForm } from "react-hook-form"
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";

const Form1 = () => {

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    alert(JSON.stringify(data))
  }

  return (

    <div className="card flex justify-content-center">
      <Button label="הוסף קטגוריה" onClick={() => setVisible(true)} />
      <Dialog label="katName" header="הוספת קטגוריה" visible={visible} style={{ width: '15vw' }} onHide={() => setVisible(false)}  >
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText required placeholder="שם קטגוריה" {...register("type", { required: true, maxLength: 20 })} />
          {/* <Input label="First Name" register={register} required placeholder="Large"/>
      <Select label="Age" {...register("Age")} /> */}
          <br /><br />
          <Button label="אישור" type="submit" />
        </form>
      </Dialog>
      <br /><br />
      <Button label="הוסף מרצה" onClick={() => setVisible1(true)} />
      <Dialog header="הוספת מרצה" visible={visible1} style={{ width: '15vw' }} onHide={() => setVisible1(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText placeholder="שם מרצה" required  {...register("name", { required: true, maxLength: 20 })} />
          <br /><br />


          <InputText label="email" placeholder="אימייל" {...register("email", { required: true, maxLength: 20 })} />
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
export default Form1
