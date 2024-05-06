
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

import { Button } from 'primereact/button';
import {  useDeleteCourseMutation, useGetCoursesQuery, useUpdateCourseMutation  } from '../../simpleUser/courses/courseApiSlice';
import SimpleLoading from '../../common/simpleLoading';

export default function AllCoursesList() {

    const {data:courses,isError,error,isLoading}=useGetCoursesQuery()
    const [updateCourses,{isLoading:isUpdateLoading,isError:isUpdateError,error:updateError}]=useUpdateCourseMutation()
    const [deleteCourse,{isLoading:isDeleteLoading,isError:isDeleteError,error:deleteError}]=useDeleteCourseMutation()
    if (isError)return (<h1>{error}</h1>)
    if (isLoading) return (<SimpleLoading />)
    if (isUpdateLoading) return (<SimpleLoading />)
    if (isDeleteLoading) return (<SimpleLoading />)
    const actionButtons=(rowData)=>{
        return <Button icon="pi pi-trash" onClick={()=>{deleteCourse({_id:rowData._id})}}></Button>     
    }

    const onRowEditComplete = (e) => {
        let _courses = [...courses];
        let { newData, index } = e;

      _courses[index] = newData;
        updateCourses(_courses[index])
    };

    const typeEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

   

    const allowEdit = (rowData) => {
        return rowData.name !== 'Blue Band';
    };

    return (
        <div className="card p-fluid">
            <DataTable value={courses} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '30rem' }}>
            <Column header="ערוך קורס" rowEditor={allowEdit} headerStyle={{ width: '30%',direction:'rtl' }} bodyStyle={{ textAlign: 'center' }}></Column>
            <Column header="מחיקת קורס" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={actionButtons} />
                <Column field="type" header="שם קורס" editor={(options) => typeEditor(options)} style={{ width: '40%' }}></Column>
            </DataTable>
        </div>
    );
}