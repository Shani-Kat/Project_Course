
import React, { useState, useEffect } from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useForm } from "react-hook-form"
import validator from "validator";
import { useLoginMutation } from './authApiSlice';
import { useDispatch } from 'react-redux';
import { setToken } from './authSlice'
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false);
    const { register, handleSubmit, reset } = useForm()
    const [message, setMessage] = useState(" ");
    const [loginFunc, { isError, error, isSuccess, data }] = useLoginMutation()
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            setVisible(false)
            reset()
            navigate("/", { status: true })

        }
    }, [isSuccess])

    const onSubmit = (data) => {
        if (message == '') {
            reset()



            loginFunc(data)

        }


        else
            alert(JSON.stringify(message))

    }





    function handleEmail(event) {
        let new_Email = event.target.value;
        if (!validator.isEmail(new_Email)) {
            setMessage("Please, enter a valid email!");
        } else {
            setMessage("");
        }
    }
    return (<>

        <Button label="כניסה" onClick={() => setVisible(true)} />
        <Dialog label="katName" visible={visible} style={{ width: '40vw' }} onHide={() => setVisible(false)}  >
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <div className="flex flex-column md:flex-row">
                        <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">Email</label>
                                <InputText required className="w-12rem" {...register("email", { required: true, maxLength: 50 })} onChange={handleEmail} />
                            </div>
                            <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                <label className="w-6rem">Password</label>
                                <InputText type='password' required className="w-12rem" {...register("password", { required: true })} />

                            </div>

                            <div>{isError ? <>הרשם למערכת</> : <></>}</div>
                            <Button label="אישור" icon="pi pi-user" className="w-10rem mx-auto"></Button>
                        </div>
                        <div className="w-full md:w-2">
                            <Divider layout="vertical" className="hidden md:flex">
                                <b>OR</b>
                            </Divider>
                            <Divider layout="horizontal" className="flex md:hidden" align="center">
                                <b>OR</b>
                            </Divider>
                        </div>
                        <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                            <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem" onClick={() => { navigate('/register'); setVisible(false) }}></Button>
                        </div>
                    </div>
                </div>
            </form>
        </Dialog>
    </>
    )
}
