

import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { useLoginMutation, useRegisterMutation } from "./authApiSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from "./authSlice";
import styled from "styled-components";
const Register = () => {
  const StyledCard = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 20px;
  background-color: #0C3C6A;
  border-radius: 5px;
  color:#E3C164;

`;
  const RadioGroup = styled.div`
  margin-top: 30px;

`;

  const RadioLabel = styled.label`
  margin-right: 10px;
  color:#ffffff;
`;
  const StyledRadioLabel = styled.label`
  margin-right: 5px;
  cursor: pointer;

  input[type="radio"]:hover + & {
    color: #ff5733; /* Change color on hover */
  }

  input[type="radio"]:checked + & {
    color: #ff5733; /* Change color when checked */
  }
`;

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit } = useForm()
  const [registerFunc, { isError, error, isSuccess, data }] = useRegisterMutation()
  const [loginFunc, { isError: isLogingError, error: loginError, isSuccess: isLoginSuccess, data: loginData }] = useLoginMutation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (isSuccess) {
      loginFunc({ email, password })
    }
  }, [isSuccess])

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(setToken(loginData))
      setVisible(false)
      navigate("/", { status: true })
    }
  }, [isLoginSuccess])

  const onSubmit = (data) => {
    setEmail(data.email)
    setPassword(data.password)
    registerFunc(data);
  }
  const [ingredient, setIngredient] = useState('');
  if (isError) return <h2>{error}</h2>;
  return (
    <StyledCard>
    <div className="card flex justify-content-center" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          placeholder="שם פרטי"
          required
          {...register("firstName", { required: true })}
        />
        <br />
        <br />
        <InputText
          placeholder="שם משפחה"
          required
          {...register("lastName", { required: true })}
        />
        <br />
        <br />
        <InputText
          placeholder="תעודת זהות"
          required
          {...register("userId", { required: true })}
        />
        <br />
        <br />
        <InputText
          placeholder="סיסמא"
          required
          {...register("password", { required: true })}
        />
        <br />
        <br />
        <InputText
          placeholder="מייל"
          required
          {...register("email", { required: true })}
        />
        <br />
        <br />
        <InputText
          placeholder="טלפון"
          required
          {...register("phone", { required: true })}
        />
        <br />
        <br />
        <RadioGroup>
          <RadioLabel>
           
            <div className="flex flex-wrap gap-3">
              <div className="flex align-items-center">
              <StyledRadioLabel>
                <div>
                  <input
                    type="radio"
                    value="male"
                    {...register("sex", { required: true })}
                  />
                  זכר
                </div>
                </StyledRadioLabel>
              </div>
              <div className="flex align-items-center">
              <StyledRadioLabel>

                <div>
                  <input
                    type="radio"
                    value="female"
                    {...register("sex", { required: true })}
                  />
                  נקבה
                </div>
                </StyledRadioLabel>
              </div>
            </div>
            <br />
            <div className="flex flex-wrap gap-3">
              <div className="flex align-items-center">
                <div>
                  <input
                    type="radio"
                    value="merried"
                    {...register("familyStatus", { required: true })}
                  />
                  נשוי
                </div>
              </div>
              <div className="flex align-items-center">
                <div>
                  <input
                    type="radio"
                    value="unmerried"
                    {...register("familyStatus", { required: true })}
                  />
                  רווק
                </div>
              </div>
            </div>
            <br />
            <div className="flex flex-wrap gap-3">
              <div className="flex align-items-center">
                <div>
                  <input
                    type="radio"
                    value="Israel"
                    {...register("community", { required: true })}
                  />
                  ישראל
                </div>
              </div>
              <div className="flex align-items-center">
                <div>
                  <input
                    type="radio"
                    value="Spain"
                    {...register("community", { required: true })}
                  />
                  ספרד
                </div>
              </div>
              <div className="flex align-items-center">
                <div>
                  <input
                    type="radio"
                    value="USA"
                    {...register("community", { required: true })}
                  />
                  ארה"ב
                </div>
              </div>
            </div>
          </RadioLabel>
        </RadioGroup>

        <br />
        <br />
   
        <Button  label="אישור" type="submit" />
      </form>
    </div>
  </StyledCard>

  )
}
export default Register
