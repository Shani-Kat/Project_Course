

import { useForm } from "react-hook-form"
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { useAddManagerMutation } from "./userApiSlice";
import SimpleLoading from "../../common/simpleLoading";
import { Dialog } from 'primereact/dialog';
const AddManager = () => {
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit } = useForm()
  const [addManager, { isError, error, isSuccess,isLoading }] =useAddManagerMutation()


  const onSubmit = (data) => {
    addManager(data)

    setVisible(false)
  }
  if (isError) return <h2>{error}</h2>;
  if(isLoading)return<SimpleLoading/>
  return (

    <div className="card flex justify-content-center" dir="rtl">

<Button label="הוספת מנהל" onClick={() => setVisible(true)} />
<Dialog label="הוספת מנהל" visible={visible} style={{ width: '40vw',dir:'rtl' }} onHide={() => setVisible(false)}  >
      <form dir="rtl"  onSubmit={handleSubmit(onSubmit)}>
        <InputText placeholder="שם פרטי" required  {...register("firstName", { required: true })} />
        <br /><br />
        <InputText placeholder="שם משפחה" required  {...register("lastName", { required: true })} />
        <br /><br />
        <InputText placeholder="תעודת זהות" required  {...register("userId", { required: true })} />
        <br /><br />
        <InputText placeholder="סיסמא" required  {...register("password", { required: true })} />
        <br /><br />
        <InputText placeholder="מייל" required  {...register("email", { required: true })} />
        <br /><br />
        <InputText placeholder="טלפון" required  {...register("phone", { required: true })} />
        <br /><br />
  
        <div className="flex flex-wrap gap-3">

          <div className="flex align-items-center">
            <div>
              <input type="radio" value="male" {...register("sex", { required: true })} />
              זכר
            </div>
          </div>
          <div className="flex align-items-center">
            <div>
              <input type="radio" value="female" {...register("sex", { required: true })} />
              נקבה
            </div>
          </div>

        </div>
        <br />
        <div className="flex flex-wrap gap-3">

          <div className="flex align-items-center">
            <div>
              <input type="radio" value="merried" {...register("familyStatus", { required: true })} />
              נשוי
            </div>
          </div>
          <div className="flex align-items-center">
            <div>
              <input type="radio" value="unmerried" {...register("familyStatus", { required: true })} />
              רווק
            </div>
          </div>

        </div>

        <br />
        <div className="flex flex-wrap gap-3">

          <div className="flex align-items-center">
            <div>
              <input type="radio" value="Israel" {...register("community", { required: true })} />
              ישראל
            </div>
          </div>
          <div className="flex align-items-center">
            <div>
              <input type="radio" value="Spain" {...register("community", { required: true })} />
              ספרד
            </div>

          </div>
          <div className="flex align-items-center">
            <div>
              <input type="radio" value="USA" {...register("community", { required: true })} />
              ארה"ב
            </div>
          </div>
        </div>

        <br /><br />
        <Button label="אישור" type="submit" />
      </form>
      </Dialog>
    </div>

  )
}
export default AddManager
