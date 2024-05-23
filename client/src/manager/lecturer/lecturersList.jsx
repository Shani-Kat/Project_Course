
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import SimpleLoading from '../../common/simpleLoading';
import { Button } from 'primereact/button';
import { useDeleteLecturerMutation, useGetLecturersQuery, useUpdateLecturerActiveMutation, useUpdateLecturerMutation } from './lecturerApiSlice';
import { Checkbox } from 'primereact/checkbox';
import validator from "validator";
export default function LecturersList() {



    const {data:lecturers,isError,error,isLoading}=useGetLecturersQuery()
    const [updateLecturer,{isLoading:isUpdateLoading,isError:isUpdateError,error:updateError}]=useUpdateLecturerMutation()
    const [deleteLecturer,{isLoading:isDeleteLoading,isError:isDeleteError,error:deleteError}]=useDeleteLecturerMutation()
    const [updateActiveLecturer,{isLoading:isActiveLoading,isError:isActiveError,error:activeError}]=useUpdateLecturerActiveMutation()
    if (isError)return (<h1>{error}</h1>)
    if (isLoading) return (<SimpleLoading />)
    if (isUpdateLoading) return (<SimpleLoading />)
    if (isDeleteLoading) return (<SimpleLoading />)
    const actionButtons=(rowData)=>{
        return <Button icon="pi pi-trash" onClick={()=>{deleteLecturer(rowData._id)}}></Button>     
    }
    const activeButtons=(rowData)=>{
        return <Checkbox checked={rowData.active} onClick={()=>{updateActiveLecturer({_id:rowData._id})}}></Checkbox>     
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
    const onRowEditComplete = (e) => {
        let _lecturers = [...lecturers];
        let { newData, index } = e;

      _lecturers[index] = newData;
      if (handleEmail(_lecturers[index].email)) {
        if(validatePhoneNumber(_lecturers[index].phone)){

        updateLecturer(_lecturers[index])
        }
        else alert("please enter a valid phone")
        // showSuccess()

    }
    else {
        alert("please enter a valid email")
    }
    }
    const typeEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)}/>;
    };

   

    const allowEdit = (rowData) => {
        return rowData.name !== 'Blue Band';
    };



    

    return (
        <div className="card p-fluid">
            <DataTable  scrollable scrollWidth="1200px" scrollHeight="600px" value={lecturers} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }}>
                
            <Column header="ערוך מרצה" rowEditor={allowEdit} headerStyle={{ width: '10rem'}} bodyStyle={{ textAlign: 'center' }}></Column>
            <Column header="מחיקת מרצה" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '10rem' }} body={actionButtons} />
            <Column header="?פעיל" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '10rem' }} body={activeButtons}></Column>
                <Column field="name" header="שם מרצה" editor={(options) => typeEditor(options)} style={{ width: '15rem' }}></Column>
                <Column field="email" header="מייל" editor={(options) => typeEditor(options)} style={{ width: '20rem' }}></Column>
                <Column field="phone" header="מספר טלפון" editor={(options) => typeEditor(options)} style={{ width: '10rem' }}></Column>
                
            </DataTable>
        </div>
    );
}