
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import SimpleLoading from '../../common/simpleLoading';
import { useDeleteKategoryMutation, useGetKategoriesQuery, useUpdateKategoryMutation } from './kategoryApiSlice';
import { Button } from 'primereact/button';

export default function KategoriesList() {

    const {data:kategories,isError,error,isLoading}=useGetKategoriesQuery()
    const [updateKAtegory,{isLoading:isUpdateLoading,isError:isUpdateError,error:updateError}]=useUpdateKategoryMutation()
    const [deleteKategory,{isLoading:isDeleteLoading,isError:isDeleteError,error:deleteError}]=useDeleteKategoryMutation()
    if (isError)return (<h1>{error}</h1>)
    if (isLoading) return (<SimpleLoading />)
    if (isUpdateLoading) return (<SimpleLoading />)
    if (isDeleteLoading) return (<SimpleLoading />)
    const actionButtons=(rowData)=>{
        return <Button icon="pi pi-trash" onClick={()=>{deleteKategory({_id:rowData._id})}}></Button>     
    }

    const onRowEditComplete = (e) => {
        let _kategories = [...kategories];
        let { newData, index } = e;

      _kategories[index] = newData;
        updateKAtegory(_kategories[index])
    };

    const typeEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

   

    const allowEdit = (rowData) => {
        return rowData.name !== 'Blue Band';
    };

    return (
        <div className="card p-fluid">
            <DataTable value={kategories} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '30rem' }}>
            <Column header="ערוך קטגוריה" rowEditor={allowEdit} headerStyle={{ width: '30%',direction:'rtl' }} bodyStyle={{ textAlign: 'center' }}></Column>
            <Column header="מחיקת קטגוריה" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={actionButtons} />
                <Column field="type" header="שם קטגוריה" editor={(options) => typeEditor(options)} style={{ width: '40%' }}></Column>
            </DataTable>
        </div>
    );
}