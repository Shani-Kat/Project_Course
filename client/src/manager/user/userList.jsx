
import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import SimpleLoading from '../../common/simpleLoading';
import { Checkbox } from 'primereact/checkbox';
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from './userApiSlice';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import validator from "validator";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
export default function UsersList() {
    const [contry] = useState(['Israel', 'USA', 'Spain']);
    const [statuses] = useState(['merried', "unmerried"]);
    const [sexes] = useState(['female', 'male']);
    // const toast = useRef(null)

    const [message, setMessage] = useState("")
    const { data: users, isError, error, isLoading } = useGetUsersQuery()
    const [updateUser, { isLoading: isUpdateLoading, isError: isUpdateError, error: updateError }] = useUpdateUserMutation()
    const [deleteUser, { isLoading: isDeleteLoading, isError: isDeleteError, error: deleteError }] = useDeleteUserMutation()
    if (isError) return (<h1>{error}</h1>)
    if (isLoading) return (<SimpleLoading />)
    if (isUpdateLoading) return (<SimpleLoading />)
    if (isDeleteLoading) return (<SimpleLoading />)

    const actionButtons = (rowData) => {
        return <Button icon="pi pi-trash" onClick={() => { deleteUser({ _id: rowData._id }) }}></Button>
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
    // const showSuccess = () => {
      
        
    //     toast.current.show({ severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000 });
    //     console.log( toast);
    // }
    const onRowEditComplete = (e) => {
        let _users = [...users];
        let { newData, index } = e;

        _users[index] = newData;

        if (handleEmail(_users[index].email)) {
            if(validatePhoneNumber(_users[index].phone)){

            updateUser(_users[index])
            // showSuccess()

        }
        else {
            alert("please enter a valid phone")
        }
    }
        else {
            alert("please enter a valid email")
        }

    };

    const typeEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };
    const emailEditor = (options) => {

        return <InputText type="email" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;

    };

    const contryEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={contry}
                onChange={(e) => options.editorCallback(e.value)}
                itemTemplate={(option) => {
                    return <Tag value={option} ></Tag>;
                }}
            />
        );
    };
    const sexEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={sexes}
                onChange={(e) => options.editorCallback(e.value)}
                itemTemplate={(option) => {
                    return <Tag value={option} ></Tag>;
                }}
            />
        );
    };
    const familyStatusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e) => options.editorCallback(e.value)}
                itemTemplate={(option) => {
                    return <Tag value={option} ></Tag>;
                }}
            />
        );
    };
    const allowEdit = (rowData) => {
        return rowData.name !== 'Blue Band';
    };

    return (
        <div className="card p-fluid">
            {/* <Toast ref={toast} /> */}
            <DataTable scrollable scrollHeight="500px" className="mt-4" value={users} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '40rem' }}>

                <Column header="ערוך משתמש" rowEditor={allowEdit} headerStyle={{ width: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column header="מחיקת משתמש" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '6rem' }} body={actionButtons} />
                <Column field="status" header="סטטוס" style={{ width: '8rem' }}></Column>

                <Column field="community" header="ארץ" editor={(options) => contryEditor(options)} style={{ width: '8rem' }}></Column>


                <Column field="email" header="מייל" editor={(options) => emailEditor(options)} style={{ width: '10rem' }}></Column>
                <Column field="phone" header="מספר טלפון" editor={(options) => typeEditor(options)} style={{ width: '11rem' }}></Column>
                <Column field="familyStatus" header="מצב משפחתי" editor={(options) => familyStatusEditor(options)} style={{ width: '9rem' }}></Column>
                <Column field="sex" header="מין" editor={(options) => sexEditor(options)} style={{ width: '6rem' }}></Column>
                <Column field="userId" header="תעודת זהות" style={{ width: '11rem' }}></Column>
                <Column field="lastName" header="שם משפחה" editor={(options) => typeEditor(options)} style={{ width: '9rem' }}></Column>
                <Column field="firstName" header="שם פרטי" editor={(options) => typeEditor(options)} style={{ width: '9rem' }}></Column>

            </DataTable>
        </div>
    );
    }