import {  useGetUserByIdQuery, useUpdateUserMutation } from '../../manager/user/userApiSlice';
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../../auth/authSlice';
import useAuth from '../../auth/userAuth';
import SimpleLoading from '../../common/simpleLoading';
import validator from "validator";

const EditUser = () => {

  const location = useLocation()  
  const { register, handleSubmit} = useForm()

  const { data: user, isError, error, isLoading } = useGetUserByIdQuery(location.state.id)
  const [updateUser, { isLoading: isUpdateLoading, isError: isUpdateError, error: updateError }] = useUpdateUserMutation()

  if(isLoading)return <SimpleLoading/>

  const onSubmit = (data) => {
    if (handleEmail(data.email)) {
      if(validatePhoneNumber(data.phone)){

        updateUser(data);      }
      else alert("please enter a valid phone")
      // showSuccess()

  }
  else {
      alert("please enter a valid email")
  }
   
  }
      
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
  if (isError) return <h2>{error}</h2>;
  return (

    <div className="card flex justify-content-center" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <br/><br/>
      <InputText type="hidden" placeholder="שם פרטי"  defaultValue={user._id} required  {...register("_id", { required: true })} />
        <InputText placeholder="שם פרטי"  defaultValue={user.firstName} required  {...register("firstName", { required: true })} />
        <br /><br />
        <InputText placeholder="שם משפחה" required defaultValue={user.lastName} {...register("lastName", { required: true })} />
        <br /><br />
    
        <InputText placeholder="מייל" required defaultValue={user.email} {...register("email", { required: true })} />
        <br /><br />
        <InputText placeholder="טלפון" required defaultValue={user.phone} {...register("phone", { required: true })} />
        <br /><br />
        <div className="flex flex-wrap gap-3">

          <div className="flex align-items-center">
            <div>
              <input type="radio" value="male" defaultChecked={user.sex=="male"?true:false} {...register("sex", { required: true })} />
              זכר
            </div>

          </div>
          <div className="flex align-items-center">
            <div>
              <input type="radio" value="female" defaultChecked={user.sex=="female"?true:false} {...register("sex", { required: true })} />
              נקבה
            </div>
          </div>

        </div>
        <br />
        <div className="flex flex-wrap gap-3">

          <div className="flex align-items-center">
            <div>
              <input type="radio" value="merried" defaultChecked={user.familyStatus=="merried"?true:false}{...register("familyStatus", { required: true })} />
              נשוי
            </div>
          </div>
          <div className="flex align-items-center">
            <div>
              <input type="radio" value="unmerried" defaultChecked={user.familyStatus=="unmerried"?true:false}  {...register("familyStatus", { required: true })} />
              רווק
            </div>
          </div>

        </div>

        <br />
        <div className="flex flex-wrap gap-3">

          <div className="flex align-items-center">
            <div>
              <input type="radio" value="Israel" defaultChecked={user.community=="Israel"?true:false}{...register("community", { required: true })} />
              ישראל
            </div>

          </div>
          <div className="flex align-items-center">
            <div>
              <input type="radio" value="Spain"  defaultChecked={user.community=="Spain"?true:false} {...register("community", { required: true })} />
              ספרד
            </div>

          </div>
          <div className="flex align-items-center">
            <div>
              <input type="radio" value="USA" defaultChecked={user.community=="USA"?true:false} {...register("community", { required: true })} />
              ארה"ב
            </div>
          </div>
        </div>

        <br /><br />
        <Button label="אישור" type="submit" />
      </form>
    </div>

  )
}
export default EditUser
