
// import React, { useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Checkbox } from 'primereact/checkbox';
import { useDeleteUserMutation, useUpdateUserMutation, useGetUserByIdQuery } from '../../manager/user/userApiSlice';
// import { Dropdown } from 'primereact/dropdown';
// import { Tag } from 'primereact/tag';
// import useAuth from '../auth/userAuth';
// import SimpleLoading from '../common/simpleLoading';


// export default function UserList() {
//     const { _id } = useAuth()
//     const [contry] = useState(['Israel', 'USA', 'Spain']);
//     const [statuses] = useState(['merried', "unmerried"]);
//     const [sexes] = useState(['female', 'male']);

//     const { data: user, isError, error, isLoading } = useGetUserByIdQuery(_id)

//     const [updateUser, { isLoading: isUpdateLoading, isError: isUpdateError, error: updateError }] = useUpdateUserMutation()
//     const [deleteUser, { isLoading: isDeleteLoading, isError: isDeleteError, error: deleteError }] = useDeleteUserMutation()
//     if (isError) return (<h1>{error}</h1>)
//     if (isLoading) return (<SimpleLoading />)
//     if (isUpdateLoading) return (<SimpleLoading />)
//     if (isDeleteLoading) return (<SimpleLoading />)

//     const actionButtons = (rowData) => {
//         return <Button icon="pi pi-trash" onClick={() => { deleteUser({ _id: rowData._id }) }}></Button>
//     }
    


//     const onRowEditComplete = (e) => {
//         let _user = [...user];
//         let { newData, index } = e;

//         _user[index] = newData;
//         updateUser(_user[index])
//     };

//     const typeEditor = (options) => {
//         return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
//     };

//     const contryEditor = (options) => {
//         return (
//             <Dropdown
//                 value={options.value}
//                 options={contry}
//                 onChange={(e) => options.editorCallback(e.value)}
//                 itemTemplate={(option) => {
//                     return <Tag value={option} ></Tag>;
//                 }}
//             />
//         );
//     };
//     const sexEditor = (options) => {
//         return (
//             <Dropdown
//                 value={options.value}
//                 options={sexes}
//                 onChange={(e) => options.editorCallback(e.value)}
//                 itemTemplate={(option) => {
//                     return <Tag value={option} ></Tag>;
//                 }}
//             />
//         );
//     };
//     const familyStatusEditor = (options) => {
//         return (
//             <Dropdown
//                 value={options.value}
//                 options={statuses}
//                 onChange={(e) => options.editorCallback(e.value)}
//                 itemTemplate={(option) => {
//                     return <Tag value={option} ></Tag>;
//                 }}
//             />
//         );
//     };
//     const allowEdit = (rowData) => {
//         return rowData.name !== 'Blue Band';
//     };

//     return (
//         <div className="card p-fluid">

//             <DataTable scrollable scrollHeight="500px" className="mt-4" value={user} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '40rem' }}>

//                 <Column header="ערוך משתמש" rowEditor={allowEdit} headerStyle={{ width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
//                 <Column header="מחיקת משתמש" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '6rem' }} body={actionButtons} />
//                 <Column field="firstName" header="שם פרטי" editor={(options) => typeEditor(options)} style={{ width: '9rem' }}></Column>
//                 <Column field="lastName" header="שם משפחה" editor={(options) => typeEditor(options)} style={{ width: '9rem' }}></Column>
//                 <Column field="userId" header="תעודת זהות" style={{ width: '11rem' }}></Column>
//                 <Column field="email" header="מייל" style={{ width: '15rem' }}></Column>
//                 <Column field="phone" header="מספר טלפון" editor={(options) => typeEditor(options)} style={{ width: '11rem' }}></Column>
//                 <Column field="familyStatus" header="מצב משפחתי" editor={(options) => familyStatusEditor(options)} style={{ width: '9rem' }}></Column>
//                 <Column field="sex" header="מין" editor={(options) => sexEditor(options)} style={{ width: '6rem' }}></Column>
//                 <Column field="community" header="ארץ" editor={(options) => contryEditor(options)} style={{ width: '8rem' }}></Column>
//                 <Column field="status" header="סטטוס" style={{ width: '8rem' }}></Column>

//             </DataTable>
//         </div>
//     );
// }



import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../../auth/authSlice';
import useAuth from '../../auth/userAuth';

const Register = () => {

    const { _id } = useAuth()
    const { data: user, isError, error, isLoading } = useGetUserByIdQuery(_id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit} = useForm()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
//   useEffect(() => {
//     if (isLoginSuccess) {
//       dispatch(setToken(loginData))
//       setVisible(false)
//       navigate("/", { status: true })
//     }
//   }, [isLoginSuccess])
  const onSubmit = (data) => {
    // console.log(JSON.stringify(data));
    // setEmail(data.email)
    // setPassword(data.password)
    // registerFunc(data);
  }
  const [ingredient, setIngredient] = useState('');
//   if (isError) return <h2>{error}</h2>;
  return (

    <div className="card flex justify-content-center" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText placeholder="שם פרטי"  value={user.firstName}required  {...register("firstName", { required: true })} />
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
    </div>

  )
}
export default Register
